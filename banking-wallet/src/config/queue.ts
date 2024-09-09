import amqp, { type Connection, type Channel } from 'amqplib'
import { walletCreation, walletdetailbyaddress, /* walletdetailbyaddress, */ walletupdatebalance } from '../services/walletservice'
import Decimal from 'decimal.js'
export const createMQConsumer = async (url: string, queueName: string, exchangeName: string, routekey: string): Promise<any> => {
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
          console.log(parsed)
          if (parsed.action === 'wallet_create') {
            const id = parsed.data.userid as string
            const pin = null
            await walletCreation(id, pin, true, false)
            channel.ack(msg)
          } else if (parsed.action === 'update_wallet_balance') {
            const address: string = parsed.data.wallet
            const amt: number = parsed.data.amount
            console.log(amt)
            const user: string = parsed.data.user
            const wallet = await walletdetailbyaddress(address)
            console.log(wallet)
            if (wallet != null) {
              const walletBalance = new Decimal(wallet.balance)
              const amount = new Decimal(amt)
              const newbalance = walletBalance.plus(amount).toFixed(2)
              await walletupdatebalance(newbalance, address, user)
              channel.ack(msg)
            }
          }
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
