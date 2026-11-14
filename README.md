# OSS 부산 잔여자재 재사용 지도

`OSS_BusanReuseMap`은 부산 센텀시티 일반산업단지를 시범 지역으로 삼아 산업단지에서 발생하는 잔여자재와 필요한 자재를 연결하는 공모전 MVP입니다.

현재 저장소에는 1~8주차의 프로젝트 관리, 협업 문서화, CI/CD, DORA 측정, Workflow 최적화 파이프라인이 구축되어 있습니다. 서비스 화면과 매칭 결과는 실제 기업 데이터가 확보·검증되기 전까지 시제품 상태로 취급합니다.

## 1~8주차 구축 성과

- **서비스 MVP:** 부산 센텀시티 일반산업단지의 잔여자재 등록, 지도·목록 탐색, 조건 기반 재사용 후보 매칭
- **프로젝트 관리:** GitHub Issues 템플릿, 라벨, `Foundation`·`MVP` Milestone, [GitHub Projects 칸반 보드](https://github.com/users/kdongyu01/projects/5)
- **협업·문서화:** GitHub Flow, Conventional Commits, [PR 리뷰 가이드](docs/review-guide.md), [GitHub Wiki](https://github.com/kdongyu01/OSS_BusanReuseMap/wiki)
- **CI/CD·최적화:** Node/OS Matrix 테스트, GitHub Pages 배포, Composite Action·Reusable Workflow, npm 캐시 벤치마크
- **DORA 메트릭:** 4대 지표 자동 수집, HTML 대시보드, Markdown 주간 보고서 생성

## 목표

- 잔여자재 정보를 지도와 목록으로 확인
- 필요한 자재의 조건으로 후보를 필터링
- 자재의 종류, 상태, 수량, 위치를 기준으로 재사용 후보 제안

## 개발

```bash
npm install
npm run dev
```

빌드 검증:

```bash
npm run build
```

## 문서

- [프로젝트 제안서](docs/project-proposal.md)
- [개발 계획](docs/development-plan.md)
- [데이터 공개 정책](docs/data-policy.md)
- [Getting Started](docs/getting-started.md)
- [Development Guide](docs/development-guide.md)
- [Troubleshooting](docs/troubleshooting.md)
- [DORA 측정 설계](docs/dora.md)
- [8주차 Workflow 최적화 리포트](docs/ci-optimization.md)
- [선택과제 현황](docs/optional-tasks.md)
- [Project 지표 설계](docs/project-metrics.md)
- [ADR 목록](docs/adr/README.md)
- [라이선스·Inner Source 로드맵](docs/license-and-innersource.md)

DORA 결과는 [DORA Actions Workflow](https://github.com/kdongyu01/OSS_BusanReuseMap/actions/workflows/dora.yml)에서, 캐시 최적화 결과는 [CI optimization Workflow](https://github.com/kdongyu01/OSS_BusanReuseMap/actions/workflows/ci-optimization.yml)의 Artifact에서 확인할 수 있습니다.

## 데이터 원칙

현재 실제 기업 재고 데이터는 확보하지 않았습니다. 공개 저장소에는 공개 데이터 또는 합성 데이터만 사용하며, 합성 데이터는 화면과 문서에서 명확히 표시합니다.
