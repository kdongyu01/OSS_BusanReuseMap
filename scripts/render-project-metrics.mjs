import { mkdir, readFile, writeFile } from 'node:fs/promises'

const inputPath = process.env.PROJECT_METRICS_INPUT ?? 'artifacts/project-metrics.json'
const outputPath = process.env.PROJECT_METRICS_REPORT ?? 'artifacts/project-metrics.md'
const report = JSON.parse(await readFile(inputPath, 'utf8'))
const rows = report.milestones.map((item) => `| ${item.milestone} | ${item.total} | ${item.closed} | ${item.remaining} | ${item.velocity} | ${item.average_cycle_time_hours ?? 'insufficient_data'} |`).join('\n')
const markdown = `# GitHub Project Metrics\n\n생성 시각: ${report.generated_at}\n\n| Milestone | 전체 Issue | 종료 | 잔여 | Velocity | 평균 Cycle Time(시간) |\n|---|---:|---:|---:|---:|---:|\n${rows}\n\n- Cycle Time: Issue 생성부터 종료까지의 시간\n- Velocity: Milestone별 종료 Issue 수\n- Burndown: 전체 Issue와 잔여 Issue의 비교\n\n초기에는 Issue 이력과 기간이 충분하지 않을 수 있으므로 값이 \`insufficient_data\`인 지표는 성과로 해석하지 않습니다.\n`
await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true })
await writeFile(outputPath, markdown)
console.log(`Project metrics report written to ${outputPath}`)
