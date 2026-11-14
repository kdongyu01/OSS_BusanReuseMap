import { mkdir, readFile, writeFile } from 'node:fs/promises'

const inputPath = process.env.DORA_INPUT ?? 'artifacts/dora-report.json'
const outputPath = process.env.DORA_HTML ?? 'artifacts/dora-dashboard.html'
const report = JSON.parse(await readFile(inputPath, 'utf8'))

const labels = {
  lead_time_for_changes: ['Lead Time', 'hours'],
  deployment_frequency: ['Deployment Frequency', 'deployments'],
  mean_time_to_recovery: ['MTTR', 'hours'],
  change_failure_rate: ['Change Failure Rate', 'percent'],
}

const cards = Object.entries(report.metrics).map(([key, metric]) => {
  const [label, unit] = labels[key]
  const value = metric.value === null ? '데이터 부족' : `${metric.value} ${unit}`
  return `<article class="card"><p>${label}</p><strong>${value}</strong><small>표본 ${metric.sample_size} · ${metric.status}</small></article>`
}).join('')

const html = `<!doctype html>
<html lang="ko">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>DORA Dashboard</title>
<style>body{margin:0;padding:32px;background:#eef2ec;color:#17231d;font-family:Arial,sans-serif}.wrap{max-width:960px;margin:auto}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}.card{padding:24px;background:#fff;border:1px solid #c8d2c7}.card p{margin:0 0 24px;color:#52705e}.card strong{display:block;font-size:2rem}.card small{display:block;margin-top:16px;color:#6b756e}header{margin-bottom:28px}h1{margin-bottom:8px}header p{color:#5f6b63}</style></head>
<body><main class="wrap"><header><h1>DORA Metrics</h1><p>${report.repository} · 최근 ${report.window_days}일 · 생성 ${report.generated_at}</p></header><section class="grid">${cards}</section></main></body></html>`

await mkdir(outputPath.split(/[\\/]/).slice(0, -1).join('/') || '.', { recursive: true })
await writeFile(outputPath, html)
console.log(`DORA dashboard written to ${outputPath}`)
