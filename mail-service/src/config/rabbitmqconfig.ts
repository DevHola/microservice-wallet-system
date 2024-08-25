import amqp, { type Connection, type Channel } from 'amqplib'
import { reusableMail } from './mail'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createMQConsumer = async (url: string, queueName: string): Promise<any> => {
  console.log('Connecting to RabbitMQ...')
  try {
    const connector: Connection = await amqp.connect(url)
    const channel: Channel = await connector.createChannel()

    console.log('Connected to RabbitMQ')
    await channel.assertQueue(queueName, {
      durable: true
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const parsed = JSON.parse(msg.content.toString())
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          await reusableMail(parsed.data.subject, parsed.data.content, parsed.data.to, parsed.data.from)
          channel.ack(msg)
          await channel.close()
          await connector.close()
        } catch (error) {
          console.error('Error processing message:', error)
        }
      } else {
        console.log('Consumer cancelled by server')
      }
    }, { noAck: false })
  } catch (error) {
    console.log('RabbitMQ error:', error)
    throw error
  }
}
