# Troubleshooting

## `npm install`이 실패하는 경우

Node.js와 npm 버전을 확인하고 `node_modules/`를 삭제한 뒤 다시 설치합니다.

## `npm run build`가 실패하는 경우

TypeScript 오류의 파일과 줄을 먼저 확인합니다. 변경사항을 작은 단위로 나누고 로컬에서 다시 빌드합니다.

## GitHub Actions가 실패하는 경우

1. Workflow의 실패한 step을 확인합니다.
2. 로컬에서 같은 npm 명령을 실행합니다.
3. Secret이 필요한지 확인하고 로그에 토큰을 출력하지 않습니다.
4. 수정 후 새 commit으로 재실행합니다.

## 실제 CI/CD 실패 사례: Pages Artifact 누락

`merge: add CI matrix and Pages deployment`와 `merge: prepare GitHub Packages utility` 단계에서 Matrix 테스트와 Build는 성공했지만 Deploy가 다음 오류로 실패했습니다.

```text
No artifacts named "github-pages" were found for this workflow run.
```

원인은 `actions/deploy-pages`가 기대하는 Pages Artifact를 `actions/upload-pages-artifact`로 만들지 않은 상태에서 배포를 시도했기 때문입니다. 일반 `actions/upload-artifact`로 올린 `vite-dist`만으로는 Pages 배포 입력이 되지 않습니다.

해결 과정은 다음과 같습니다.

1. Build 결과를 `vite-dist` Artifact로 업로드합니다.
2. Deploy Job에서 `actions/download-artifact`로 `vite-dist`를 받습니다.
3. `actions/configure-pages`를 실행합니다.
4. `actions/upload-pages-artifact`로 `github-pages`용 Artifact를 생성합니다.
5. `actions/deploy-pages`를 실행합니다.

현재 구현은 `.github/workflows/ci.yml`에 이 순서를 반영했으며, 변경 후 CI와 Deploy가 성공했습니다.

## 관련 문서

- [Getting Started](getting-started.md) / Wiki: [[Getting Started]]
- [Development Guide](development-guide.md) / Wiki: [[Development Guide]]
- Wiki 시작 페이지: [[Home]]

## 지도가 표시되지 않는 경우

배경지도 연결과 데이터 GeoJSON을 별도로 확인합니다. 데이터가 비어 있을 때는 오류 대신 데이터 없음 상태를 표시해야 합니다.
