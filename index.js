import { createHash } from 'node:crypto'
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from 'node:worker_threads'

if (isMainThread) {
  const threads = process.argv[2]
  const prefix = process.argv[3]
  const input = process.argv.slice(4).join('')

  console.log(` threads: ${threads} / prefix: ${prefix} / input: ${input}`)

  const workers = []
  for (let i = 0; i < threads; i++) {
    const worker = new Worker('./index.js', { workerData: { prefix, input } })
    worker.on('message', () => {
      workers
        .filter((otherWorker) => otherWorker !== worker)
        .forEach((otherWorker) => otherWorker.terminate())
    })
    workers.push(worker)
  }
} else {
  const { prefix, input } = workerData

  let nonce
  let hash

  do {
    nonce = `${Math.random().toFixed(18).substring(2)}${Math.random().toFixed(18).substring(2)}`
    hash = createHash('sha256').update(`${input}${nonce}`).digest('hex')
    console.log(`input: ${input} / nonce: ${nonce} / hash: ${hash}`)
  } while (!hash.startsWith(prefix))
  parentPort.postMessage('END')
}
