import { createHash } from 'node:crypto'

const prefix = process.argv[2]
const input = process.argv.slice(3).join('')

let nonce
let hash

do {
  nonce = `${Math.random().toFixed(18).substring(2)}${Math.random().toFixed(18).substring(2)}`
  hash = createHash('sha256').update(`${input}${nonce}`).digest('hex')
  console.log(`input: ${input} / nonce: ${nonce} / hash: ${hash}`)
} while (!hash.startsWith(prefix))
