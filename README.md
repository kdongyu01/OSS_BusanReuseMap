# OSS 부산 잔여자재 재사용 지도

`OSS_BusanReuseMap`은 부산 센텀시티 일반산업단지를 시범 지역으로 삼아 산업단지에서 발생하는 잔여자재와 필요한 자재를 연결하는 공모전 MVP입니다.

현재 저장소는 1주차 개발 환경과 프로젝트 제안의 최소 골격을 담고 있습니다. 데이터와 매칭 결과가 실제로 검증되기 전까지 화면의 내용은 시제품 상태로 취급합니다.

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

## 데이터 원칙

현재 실제 기업 재고 데이터는 확보하지 않았습니다. 공개 저장소에는 공개 데이터 또는 합성 데이터만 사용하며, 합성 데이터는 화면과 문서에서 명확히 표시합니다.
