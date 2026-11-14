# @kdongyu01/oss-busan-reuse-utils

부산 산업단지 잔여자재 매칭 MVP에서 사용할 수 있는 작은 순수 함수 패키지입니다.

## 사용

```js
import { scoreMaterialMatch } from '@kdongyu01/oss-busan-reuse-utils'

scoreMaterialMatch(
  { type: 'steel', condition: 'usable', quantity: 10 },
  { type: 'steel', condition: 'usable', quantity: 12 },
)
```

현재 점수는 유형·상태·수량 조건의 단순 일치 비율입니다. 실제 서비스의 가중치로 확정된 값이 아니며, 데이터와 사용자 검증 후 조정해야 합니다.
