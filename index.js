import { createHash } from 'node:crypto'
import { cpus } from 'node:os'
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from 'node:worker_threads'

if (isMainThread) {
  // Observação quando usar o asterisco, precis utilizar esses argumentos abaixo
  const threads = isFinite(process.argv[2]) ? process.argv[2] : cpus().length
  const prefix = process.argv[7] // Sem o asterisco coloque: process.argv[3]
  const input = process.argv.slice(8).join('') // Sem o asterisco coloque: process.argv.slice(4).join('')

  console.log(`threads: ${threads} | prefix: ${prefix} | input: ${input}`)

  const workers = []
  for (let i = 0; i < threads; i++) {
    const worker = new Worker('./index.js', { workerData: { prefix, input } })
    worker.on('message', (message) => {
      workers
        .filter((otherWorker) => otherWorker !== worker)
        .forEach((otherWorker) => otherWorker.terminate())
      console.log(`thread: ${i} | ${message}`)
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
  } while (!hash.startsWith(prefix))
  parentPort.postMessage(`input: ${input} | nonce: ${nonce} | hash: ${hash}`)
}
