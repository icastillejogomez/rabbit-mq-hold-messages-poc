import amqplib from 'amqplib'

const QUEUE = 'tasks'

const wait = (t) => new Promise((r) => {
  setTimeout(r, t)
})

export async function startConsumer() {
  console.log('Consumer')

  console.log('Conectando...')
  const conn = await amqplib.connect('amqp://yuvod:pass@localhost:5679')
  console.log('Conectado')

  const ch1 = await conn.createChannel();
  ch1.prefetch(1)
  await ch1.assertQueue(QUEUE, {
    durable: true,
  })


  ch1.consume(QUEUE, async (msg) => {
    const message = msg.content.toString()
    console.log(message)
    await wait(3000)
    console.log('ack: ' + message)
    ch1.ack(msg)
  }, {
    noAck: false,
  })
}