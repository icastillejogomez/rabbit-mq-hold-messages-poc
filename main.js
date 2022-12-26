import { startConsumer, startProducer } from './app/index.js'

const MODE = process.env.MODE
if (MODE !== 'consumer' && MODE !== 'producer') {
  throw new Error('MODE must be "consumer" or "producer"')
}

if (MODE === 'consumer') {
  startConsumer()
} else {
  startProducer()
}