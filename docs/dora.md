# DORA 측정 설계

워크플로 파일은 `.github/workflows/dora.yml`이며, 매주 월요일 또는 수동 실행으로 최근 30일의 GitHub 기록을 수집합니다. 실행 결과에는 JSON, HTML 대시보드, Markdown 주간 보고서가 함께 포함됩니다.

## 지표 정의

| 지표 | 현재 계산 기준 |
|---|---|
| Lead Time for Changes | PR의 첫 commit부터 merge까지 평균 시간 |
| Deployment Frequency | 성공 상태인 GitHub deployment 수 |
| MTTR | `incident` 라벨 Issue 생성부터 종료까지 평균 시간 |
| Change Failure Rate | `incident` 라벨 Issue 수 / 성공 배포 수의 추정 비율 |

초기 프로젝트에는 배포와 장애 기록이 충분하지 않을 수 있습니다. 이때 결과는 `insufficient_data`로 표시하며, 0점이나 임의의 성과 수치로 바꾸지 않습니다. Change Failure Rate는 incident와 deployment를 직접 연결하지 못하는 초기 기준선이므로 추정치로 표시합니다.

## 운영 규칙

- 장애 Issue에는 `incident` 라벨을 붙입니다.
- 복구가 끝나면 Issue를 종료하고 관련 PR을 연결합니다.
- 배포는 GitHub deployment 기록이 남는 방식으로 수행합니다.
- Artifact는 30일만 보존하며, 중요한 결과는 발표용 문서에 별도로 요약합니다.
