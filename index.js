import { createHash } from 'node:crypto'

const prefix = process.argv[2]
const input = process.argv.slice(3).join('')

let nonce = 0
let hash = ''

do {
  nonce++
  hash = createHash('sha256').update(`${input}${nonce}`).digest('hex')
  console.log(`input: ${input} / nonce: ${nonce} / hash: ${hash}`)
} while (!hash.startsWith(prefix))
