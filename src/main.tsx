import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">OSS 부산 지역문제 MVP</p>
        <h1 id="page-title">산업단지 잔여자재 재사용 지도</h1>
        <p className="summary">
          센텀시티 산업단지에서 남는 자재와 필요한 자재를 연결하는 서비스의 초기 화면입니다.
        </p>
        <div className="status" role="status">
          <span className="status-dot" aria-hidden="true" />
          1주차 개발 환경 준비 완료
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
