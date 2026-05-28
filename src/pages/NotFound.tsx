import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  useEffect(() => {
    document.title = '404 — Page Not Found | Devanshu Patil'
  }, [])

  return (
    <main className="max-w-3xl mx-auto px-4 py-24 flex flex-col items-center text-center">
      <span className="font-serif text-8xl font-bold text-editorial-accent mb-4 select-none">
        404
      </span>
      <h1 className="font-serif text-3xl font-bold text-editorial-text dark:text-gray-100 mb-3">
        Page not found
      </h1>
      <p className="text-editorial-muted mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-editorial-accent text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          ← Back to Home
        </Link>
        <Link
          to="/blog"
          className="border border-editorial-accent text-editorial-accent font-semibold px-6 py-3 rounded-lg hover:bg-editorial-accent/8 transition-colors"
        >
          Browse Posts
        </Link>
      </div>
    </main>
  )
}
