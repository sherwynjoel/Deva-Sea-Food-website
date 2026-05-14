import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'

const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center bg-ocean-950">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-ocean-500 border-t-transparent"></div>
        </div>
      }>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
