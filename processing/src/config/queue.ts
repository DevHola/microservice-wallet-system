/* eslint-disable @typescript-eslint/no-unsafe-argument */
import amqp, { type Connection, type Channel } from 'amqplib'

export const createMQP2WProducer = async (url: string, queueName: string, exchangeName: string, routekey: string): Promise<any> => {
  const exchangeType: string = 'direct'
  // eslint-disable-next-line no-useless-catch
  try {
    const connection: Connection = await amqp.connect(url)
    const channel: Channel = await connection.createChannel()
    console.log('Connected to RabbitMQ')
    await channel.assertExchange(exchangeName, exchangeType, { durable: true })
    await channel.assertQueue(queueName, { durable: true })
    await channel.bindQueue(queueName, exchangeName, routekey)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return (msg: string) => {
      console.log('Producing message to RabbitMQ...')
      channel.publish(exchangeName, routekey, Buffer.from(msg))
    }
  } catch (error) {
    console.log('RabbitMQ error:', error)
    throw error
  }
}

export const createMQETConsumer = async (url: string, queueName: string, exchangeName: string, routekey: string): Promise<any> => {
  const exchangeType: string = 'direct'
  // eslint-disable-next-line no-useless-catch
  try {
    const connection: Connection = await amqp.connect(url)
    const channel: Channel = await connection.createChannel()
    console.log('Connected to RabbitMQ')
    await channel.assertExchange(exchangeName, exchangeType, { durable: true })
    await channel.assertQueue(queueName, { durable: true })
    await channel.bindQueue(queueName, exchangeName, routekey)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        // eslint-disable-next-line no-useless-catch
        try {
          const parsed = JSON.parse(msg.content.toString())
          console.log(parsed.data.userid)
          // const id = parsed.data.userid as string
          // await walletCreation(id)
          channel.ack(msg)
        } catch (error) {
          throw error
        }
      } else {
        console.log('Consumer cancelled by server')
      }
    })
  } catch (error) {
    console.log('RabbitMQ error:', error)
    throw error
  }
}
