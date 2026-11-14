import { mkdir, readFile, writeFile } from 'node:fs/promises'

const inputPath = process.env.DORA_INPUT ?? 'artifacts/dora-report.json'
const outputPath = process.env.DORA_REPORT ?? 'artifacts/dora-weekly-report.md'
const report = JSON.parse(await readFile(inputPath, 'utf8'))
const metricRows = Object.entries(report.metrics).map(([name, metric]) => {
  const value = metric.value === null ? 'insufficient_data' : `${metric.value} ${metric.unit}`
  return `| ${name} | ${value} | ${metric.sample_size} | ${metric.status} |`
}).join('\n')

const markdown = `# DORA 주간 보고서

- 저장소: ${report.repository}
- 측정 기간: 최근 ${report.window_days}일
- 생성 시각: ${report.generated_at}

| 지표 | 값 | 표본 수 | 상태 |
|---|---:|---:|---|
${metricRows}

데이터가 부족한 지표는 성과 수치가 아닌 \`insufficient_data\`로 표시합니다. Change Failure Rate는 초기 기준선에서 incident와 배포를 직접 연결하지 못하는 추정치입니다.
`

await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true })
await writeFile(outputPath, markdown)
console.log(`DORA weekly report written to ${outputPath}`)
