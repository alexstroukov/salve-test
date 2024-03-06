import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SuspensePanel from './components/atoms/SuspensePanel'

const DashboardPage = lazy(() => import('./components/pages/DashboardPage'))
const NoMatchPage = lazy(() => import('./components/pages/NoMatchPage'))

function App() {
  return (
    <Router>
      <Suspense fallback={<SuspensePanel />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
