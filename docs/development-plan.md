# 개발 계획

## 진행 규칙

- 기본 브랜치: `main`
- 기능 브랜치: `feature/<작업명>`
- Conventional Commits 사용
- PR 리뷰는 외부 리뷰어 없이 개인 리뷰 실습으로 기록

## 개발 환경 증빙

- 본 저장소 원격: `git@github.com:kdongyu01/OSS_BusanReuseMap.git`
- SSH 연결 확인: `ssh -T git@github.com` 성공
- 테스트 저장소: https://github.com/kdongyu01/OSS_BusanReuseMap-test
- 테스트 저장소에서 `test: verify GitHub SSH push` commit/push 완료

## 프로젝트 운영 범위

- GitHub·SSH·React 개발 환경과 프로젝트 제안
- GitHub Actions 기반 DORA 수집
- GitHub Projects와 Issue 백로그
- Feature 브랜치, PR, `[MUST]`·`[SHOULD]` 개인 리뷰
- Wiki와 저장소 기반 비동기 협업 문서
- Public OSS 파일과 라이선스 구조
- Lint·Test·Matrix·Build-Test-Deploy CI/CD
- Reusable Workflow, Composite Action, 캐싱·조건부 배포 최적화
- GitHub Packages 및 의존성 보안 자동화

## 초기 검증 기준

- `npm install`이 완료됩니다.
- `npm run build`가 성공합니다.
- 브라우저에서 프로젝트 소개 화면이 열립니다.
- 원본 강의 PDF와 개인정보가 Git에 포함되지 않습니다.
