import { mkdir, readFile, writeFile } from 'node:fs/promises'

const noCache = JSON.parse(await readFile('benchmark/ci-timing-no-cache/ci-timing.json', 'utf8'))
const cached = JSON.parse(await readFile('benchmark/ci-timing-cache/ci-timing.json', 'utf8'))
const improvement = Number((((noCache.elapsed_seconds - cached.elapsed_seconds) / noCache.elapsed_seconds) * 100).toFixed(2))
const report = {
  generated_at: new Date().toISOString(),
  before: noCache,
  after: cached,
  improvement_percent: improvement,
}

await mkdir('artifacts', { recursive: true })
await writeFile('artifacts/ci-optimization-report.json', `${JSON.stringify(report, null, 2)}\n`)
await writeFile('artifacts/ci-optimization-report.md', `# CI 최적화 비교\n\n| 구분 | 실행 시간 |\n|---|---:|\n| 캐시 미사용 | ${noCache.elapsed_seconds}s |\n| npm 캐시 사용 | ${cached.elapsed_seconds}s |\n\n개선률: **${improvement}%**\n`)
