# GitHub Project 지표

`.github/workflows/project-metrics.yml`은 GitHub Issue와 Milestone 기록을 이용해 선택과제 지표를 산출합니다.

- **Cycle Time:** Issue 생성부터 종료까지의 시간
- **Velocity:** Milestone별 종료 Issue 수
- **Burndown:** Milestone별 전체 Issue와 잔여 Issue 비교

매주 월요일 또는 수동 실행 후 `project-metrics-*` Artifact에서 JSON 원본과 Markdown 보고서를 확인합니다. 이 저장소의 초기 Issue는 과거 상태 변경 이력이 충분하지 않으므로 `insufficient_data`를 성과로 해석하지 않습니다.