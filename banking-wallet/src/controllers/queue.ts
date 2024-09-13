import { createMQConsumer } from '../config/queue'
const url = process.env.MQCONNECTURL ?? 'amqp://guest:guest@localhost:5672/'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createWalletOnSignup = async () => {
  try {
    const queueName: string = 'user_wallet_queue'
    const exchange: string = 'user_wallet_exchange'
    const routekey: string = 'user_wallet_route'
    await createMQConsumer(url, queueName, exchange, routekey)
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const updateWalletAndBalanceHistory = async () => {
  try {
    const queueName: string = 'wallet_payment_queue'
    const exchange: string = 'wallet_payment_exchange'
    const routekey: string = 'wallet_payment_route'
    await createMQConsumer(url, queueName, exchange, routekey)
  } catch (error) {
    console.log(error)
  }
}
