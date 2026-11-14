# GitHub Packages 실습

## 패키지

`@kdongyu01/oss-busan-reuse-utils`는 잔여자재 매칭에 필요한 순수 함수를 별도 npm 패키지로 분리한 8주차 실습 대상입니다.

## 실행

Workflow 파일은 `.github/workflows/package-publish.yml`입니다.

- 수동 실행: GitHub Actions에서 `Publish npm package` 실행
- 태그 실행: `package-v0.1.0`과 같은 태그 push
- 인증: 저장소의 기본 `GITHUB_TOKEN`을 `NODE_AUTH_TOKEN`으로 주입

첫 publish 전에는 GitHub Packages의 npm 패키지 공개 범위와 계정·저장소 권한을 공식 문서에서 확인해야 합니다. 토큰을 코드나 `.npmrc`에 저장하지 않습니다.

## 범위와 한계

이 패키지는 서비스 운영의 필수 의존성이 아닙니다. 패키지 저장 용량이나 무료 정책이 변경되거나 공개 설정이 맞지 않을 경우, 로컬 `src/` 함수로 되돌려도 MVP 기능에는 영향이 없도록 설계했습니다.
