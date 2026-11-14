import { mkdir, writeFile } from 'node:fs/promises'

const repository = process.env.GITHUB_REPOSITORY
const token = process.env.GITHUB_TOKEN
const apiUrl = process.env.GITHUB_API_URL ?? 'https://api.github.com'
const outputPath = process.env.PROJECT_METRICS_OUTPUT ?? 'artifacts/project-metrics.json'

if (!repository || !token) throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required')

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
}

async function github(path) {
  const response = await fetch(`${apiUrl}${path}`, { headers })
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${path}`)
  return response.json()
}

async function allPages(path) {
  const result = []
  for (let page = 1; ; page += 1) {
    const separator = path.includes('?') ? '&' : '?'
    const pageItems = await github(`${path}${separator}per_page=100&page=${page}`)
    result.push(...pageItems)
    if (pageItems.length < 100) return result
  }
}

function average(values) {
  return values.length === 0 ? null : Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
}

const milestones = await allPages(`/repos/${repository}/milestones?state=all`)
const milestoneMetrics = []
for (const milestone of milestones) {
  const issues = (await allPages(`/repos/${repository}/issues?state=all&milestone=${milestone.number}`))
    .filter((issue) => !issue.pull_request)
  const closed = issues.filter((issue) => issue.state === 'closed')
  const cycleTimes = closed
    .filter((issue) => issue.closed_at)
    .map((issue) => (new Date(issue.closed_at).getTime() - new Date(issue.created_at).getTime()) / (1000 * 60 * 60))
  milestoneMetrics.push({
    milestone: milestone.title,
    total: issues.length,
    closed: closed.length,
    remaining: issues.length - closed.length,
    velocity: closed.length,
    average_cycle_time_hours: average(cycleTimes),
  })
}

const report = {
  generated_at: new Date().toISOString(),
  repository,
  definitions: {
    cycle_time: 'Issue 생성부터 Issue 종료까지의 시간(시간 단위)',
    velocity: 'Milestone별 종료된 Issue 수',
    burndown: 'Milestone별 전체 Issue와 남은 Issue의 비교',
  },
  milestones: milestoneMetrics,
}

await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true })
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`)
console.log(`Project metrics written to ${outputPath}`)
