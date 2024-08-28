import { createMQConsumer } from '../config/rabbitmqconfig'
const url = process.env.MQCONNECTURL ?? ''
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const sendMail = async () => {
  const queueName: string = 'mailqueue'
  await createMQConsumer(url, queueName)
}
