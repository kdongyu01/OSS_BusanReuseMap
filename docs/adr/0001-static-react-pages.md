# ADR-0001: React 정적 배포를 우선한다

- 상태: 승인
- 날짜: 2026-11-14

## Context

1인 개발과 무료 운영 조건에서 로그인·서버·DB가 MVP 필수 기능이 아니며, 지도와 분석 결과를 사전 계산해 제공할 수 있습니다.

## Decision

React + TypeScript + Vite를 사용하고 GitHub Pages를 기본 배포 대상으로 선택합니다. 사용자 요청 시 Python 연산이 필요한 시점에만 별도 서버를 검토합니다.

## Consequences

배포 구조가 단순하고 CI/CD 실습이 쉬워집니다. 실시간 분석과 비공개 데이터 저장은 후속 범위로 남으며, 정적 JSON·GeoJSON의 갱신 Workflow가 필요합니다.
