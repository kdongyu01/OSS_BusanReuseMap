import { readFile, writeFile } from 'node:fs/promises'

const start = Number(await readFile('.ci-start', 'utf8'))
const elapsedSeconds = Number(((Date.now() - start) / 1000).toFixed(2))
const result = {
  cache: process.env.CI_CACHE_MODE === 'true',
  elapsed_seconds: elapsedSeconds,
  generated_at: new Date().toISOString(),
}

await writeFile('ci-timing.json', `${JSON.stringify(result, null, 2)}\n`)
const output = process.env.GITHUB_OUTPUT
if (output) await writeFile(output, `elapsed_seconds=${elapsedSeconds}\n`, { flag: 'a' })
console.log(JSON.stringify(result))
