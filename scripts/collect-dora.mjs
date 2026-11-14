import { mkdir, writeFile } from 'node:fs/promises'

const repository = process.env.GITHUB_REPOSITORY
const token = process.env.GITHUB_TOKEN
const apiUrl = process.env.GITHUB_API_URL ?? 'https://api.github.com'
const days = Number(process.env.DORA_DAYS ?? 30)
const outputPath = process.env.DORA_OUTPUT ?? 'artifacts/dora-report.json'
const cutoff = Date.now() - days * 24 * 60 * 60 * 1000

if (process.argv.includes('--sample')) {
  await writeReport(createReport({
    leadTimeHours: [12, 24],
    deploymentCount: 2,
    recoveryHours: [6],
    incidentCount: 1,
  }))
  process.exit(0)
}

if (!repository || !token) {
  throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required')
}

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
}

async function github(path) {
  const response = await fetch(`${apiUrl}${path}`, { headers })
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}: ${path}`)
  }
  return response.json()
}

async function allPages(path) {
  const results = []
  for (let page = 1; ; page += 1) {
    const separator = path.includes('?') ? '&' : '?'
    const current = await github(`${path}${separator}per_page=100&page=${page}`)
    results.push(...current)
    if (current.length < 100) return results
  }
}

function hoursBetween(start, end) {
  return (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60)
}

function average(values) {
  return values.length === 0
    ? null
    : Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2))
}

function metric(value, unit, sampleSize, note) {
  return {
    value,
    unit,
    sample_size: sampleSize,
    status: value === null ? 'insufficient_data' : 'measured',
    note,
  }
}

function createReport({ leadTimeHours, deploymentCount, recoveryHours, incidentCount }) {
  const leadTime = average(leadTimeHours)
  const recovery = average(recoveryHours)
  const changeFailureRate = deploymentCount === 0
    ? null
    : Number(((incidentCount / deploymentCount) * 100).toFixed(2))

  return {
    generated_at: new Date().toISOString(),
    repository,
    window_days: days,
    methodology: {
      lead_time: 'Merged pull request의 첫 commit부터 merge까지의 평균 시간',
      deployment_frequency: '성공 상태인 GitHub deployment 수를 기간으로 나눈 값',
      mttr: 'incident 라벨 Issue 생성부터 종료까지의 평균 시간',
      change_failure_rate: 'incident 라벨 Issue 수를 성공 배포 수로 나눈 추정 비율',
    },
    metrics: {
      lead_time_for_changes: metric(leadTime, 'hours', leadTimeHours.length, '실제 배포 성공 시간 대신 PR merge 기록을 사용한 기준선'),
      deployment_frequency: metric(deploymentCount, 'deployments', deploymentCount, '성공한 deployment 기록 기준'),
      mean_time_to_recovery: metric(recovery, 'hours', recoveryHours.length, 'incident 라벨 Issue가 종료된 경우만 계산'),
      change_failure_rate: metric(changeFailureRate, 'percent', incidentCount, 'incident와 deployment의 직접 연결이 없어 추정치'),
    },
  }
}

async function collect() {
  const [pulls, deployments, incidents] = await Promise.all([
    allPages(`/repos/${repository}/pulls?state=closed&sort=updated&direction=desc`),
    allPages(`/repos/${repository}/deployments`),
    allPages(`/repos/${repository}/issues?state=all&labels=incident&sort=updated&direction=desc`),
  ])

  const mergedPulls = pulls.filter((pull) => {
    return pull.merged_at && new Date(pull.merged_at).getTime() >= cutoff
  })
  const leadTimeHours = []
  for (const pull of mergedPulls) {
    const commits = await allPages(`/repos/${repository}/pulls/${pull.number}/commits`)
    const dates = commits
      .map((commit) => commit.commit?.author?.date ?? commit.commit?.committer?.date)
      .filter(Boolean)
      .map((date) => new Date(date).getTime())
    if (dates.length > 0) {
      leadTimeHours.push((new Date(pull.merged_at).getTime() - Math.min(...dates)) / (1000 * 60 * 60))
    }
  }

  const successfulDeployments = []
  for (const deployment of deployments.filter((item) => new Date(item.created_at).getTime() >= cutoff)) {
    const statuses = await github(`/repos/${repository}/deployments/${deployment.id}/statuses`)
    if (statuses.some((status) => status.state === 'success')) successfulDeployments.push(deployment)
  }

  const recoveryHours = incidents
    .filter((issue) => issue.closed_at && new Date(issue.created_at).getTime() >= cutoff)
    .map((issue) => hoursBetween(issue.created_at, issue.closed_at))

  return createReport({
    leadTimeHours,
    deploymentCount: successfulDeployments.length,
    recoveryHours,
    incidentCount: recoveryHours.length,
  })
}

async function writeReport(report) {
  await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log(`DORA report written to ${outputPath}`)
}

await writeReport(await collect())
