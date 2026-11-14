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

## 지도가 표시되지 않는 경우

배경지도 연결과 데이터 GeoJSON을 별도로 확인합니다. 데이터가 비어 있을 때는 오류 대신 데이터 없음 상태를 표시해야 합니다.
