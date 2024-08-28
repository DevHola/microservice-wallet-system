import { createMQConsumer } from '../config/queue'

const url = process.env.MQCONNECTURL ?? 'amqp://guest:guest@localhost:5672/'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendMail = async () => {
  try {
    const queueName: string = 'walletqueue'
    const exchange: string = 'wallet_exchange'
    const routekey: string = 'wallet_route'
    await createMQConsumer(url, queueName, exchange, routekey)
  } catch (error) {
    console.log(error)
  }
}
