import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { BlogIndex } from './pages/BlogIndex'
import { CategoryPage } from './pages/CategoryPage'
import { PostPage } from './pages/PostPage'
import { NotFound } from './pages/NotFound'
import { AnimatedBackground } from './components/AnimatedBackground'

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col flex-1">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/posts/:slug" element={<PostPage />} />
              <Route path="/blog/:category" element={<CategoryPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

