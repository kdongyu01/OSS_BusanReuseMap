# Workflow 최적화

## 구현 항목

- `.github/workflows/reusable-node-checks.yml`: Node 버전·실행 환경을 입력받는 Reusable Workflow
- `.github/actions/setup-node-deps/action.yml`: Node 설정, npm 캐시, `npm ci`를 재사용하는 Composite Action
- `.github/workflows/ci.yml`: Matrix 테스트와 앱 변경 파일 기반 선택 배포
- `.github/workflows/ci-optimization.yml`: 캐시 전후 측정과 비교 리포트 생성

## 측정 방법

GitHub Actions에서 `CI optimization benchmark`를 수동 실행하거나 관련 Workflow·의존성 변경을 `main`에 push합니다. `npm-cache: false`와 `npm-cache: true` 실행 시간을 각각 측정하고, `ci-optimization-report` Artifact의 Markdown과 JSON을 제출 증빙으로 사용합니다.

개선률은 다음 식으로 계산합니다.

$$
개선률(\%) = \frac{캐시\ 미사용\ 시간 - 캐시\ 사용\ 시간}{캐시\ 미사용\ 시간} \times 100
$$

실제 실행 전에는 예상 수치를 작성하지 않습니다. Artifact 생성 후 측정값을 이 문서 또는 README에 기록합니다.

## 실제 측정 결과

2026-11-14 실행 결과:

| 구분 | 실행 시간 |
|---|---:|
| 캐시 미사용 | 41.49초 |
| npm 캐시 사용 | 9.93초 |
| 개선률 | **76.07%** |

공식 증빙은 [CI optimization Workflow](https://github.com/kdongyu01/OSS_BusanReuseMap/actions/workflows/ci-optimization.yml)의 `ci-optimization-report` Artifact입니다.
