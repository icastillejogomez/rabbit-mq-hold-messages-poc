import amqplib from 'amqplib'

const EXCHANGE = 'ex'
const QUEUE = 'tasks'

export async function startProducer() {
  console.log('Producer')

  console.log('Conectando...')
  const conn = await amqplib.connect('amqp://yuvod:pass@localhost:5679')
  console.log('Conectado')

  const ch2 = await conn.createChannel();
  await ch2.assertQueue(QUEUE, {
    durable: true,
  })

  console.log('Enviando mensaje...')
  const msg = 'something to do'
  ch2.sendToQueue(QUEUE, Buffer.from(msg), {
    deliveryMode: 2,
  })
  ch2.sendToQueue(QUEUE, Buffer.from('something to do 2'), {
    deliveryMode: 2,
  })
  ch2.sendToQueue(QUEUE, Buffer.from('something to do 3'), {
    deliveryMode: 2,
  })

  console.log('Mensaje enviado')
}