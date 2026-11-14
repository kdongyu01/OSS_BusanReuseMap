# GitHub Project 운영안

## Project 설정

Project 이름: `OSS_BusanReuseMap MVP`

실제 Project: https://github.com/users/kdongyu01/projects/5

저장소에 연결된 공개 Project이며, 현재 초기 백로그 Issue 10개가 `To Do` 상태로 등록되어 있습니다.

보드 상태:

1. Backlog
2. To Do
3. In Progress
4. Review
5. Done

Milestone:

- `Foundation`: 1~8주차 개발 운영과 자동화
- `MVP`: 지도, 데이터, 매칭 기능

## 라벨

| 라벨 | 용도 |
|---|---|
| `type: feature` | 신규 기능 |
| `type: bug` | 오류 수정 |
| `area: frontend` | React 화면 |
| `area: data` | 데이터 정제·분석 |
| `area: ci` | Actions·배포 |
| `priority: high` | 선행 또는 발표 핵심 작업 |
| `priority: normal` | 일반 작업 |
| `data: synthetic` | 합성 데이터 사용 |

## 초기 백로그 10개

| 제목 | 유형 | 영역 | 우선순위 | Milestone |
|---|---|---|---|---|
| React 초기 화면과 서비스 소개 구현 | Feature | frontend | high | Foundation |
| 잔여자재 GeoJSON 필드 정의 | Feature | data | high | MVP |
| 센텀시티 시범 자재 합성 데이터 작성 | Feature | data | high | MVP |
| 자재 목록과 유형 필터 구현 | Feature | frontend | high | MVP |
| 지도에 자재 위치 마커 표시 | Feature | frontend | high | MVP |
| 자재 상세 정보 패널 구현 | Feature | frontend | normal | MVP |
| 필요 자재 조건 입력 화면 구현 | Feature | frontend | normal | MVP |
| 자재 매칭 점수 계산 함수 작성 | Feature | data | high | MVP |
| DORA 수집 Workflow 오류 처리 개선 | Feature | ci | normal | Foundation |
| GitHub Pages 배포와 공개 URL 점검 | Feature | ci | high | Foundation |

## 1인 운영 규칙

- 모든 Issue는 본인이 작성하고 Project에 연결합니다.
- 상태 변경은 작업 시작·리뷰·완료 시점에 직접 기록합니다.
- 외부 리뷰어가 없으므로 Review 상태는 개인 리뷰 체크리스트와 CI 실행 결과를 확인하는 단계입니다.
- 완료된 Issue에는 관련 commit 또는 PR 링크를 남깁니다.
