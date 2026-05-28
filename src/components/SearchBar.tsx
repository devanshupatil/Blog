import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import type { PostMeta } from '../types/post'

function search(query: string): PostMeta[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return getAllPosts().filter(
    (p: PostMeta) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t: string) => t.toLowerCase().includes(q)),
  ).slice(0, 6)
}

// Custom Search SVG icon for a premium look (replaces emoji 🔍)
function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

// Clear SVG icon (replaces ✕ text)
function ClearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-3.5 h-3.5 text-gray-400 hover:text-editorial-accent transition-colors shrink-0"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = search(query)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(slug: string) {
    navigate(`/blog/posts/${slug}`)
    setQuery('')
    setOpen(false)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className="flex items-center gap-2 bg-gray-50/80 dark:bg-[#1c1c1c] border border-gray-200 dark:border-[#2d2d2d] focus-within:border-editorial-accent dark:focus-within:border-editorial-accent focus-within:ring-2 focus-within:ring-editorial-accent/20 dark:focus-within:ring-editorial-accent/15 rounded-lg px-4 py-2 transition-all duration-200">
        <SearchIcon />
        <input
          type="search"
          value={query}
          placeholder="Search articles..."
          className="bg-transparent text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none w-full font-sans leading-none"
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            className="flex items-center justify-center p-0.5"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {open && query.length > 0 && (
        <div className="absolute top-full mt-1.5 left-0 right-0 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#2b2b2b] rounded-lg shadow-xl overflow-hidden z-50 transition-all duration-200">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
              No results for "{query}"
            </p>
          ) : (
            results.map((post) => (
              <button
                key={post.slug}
                type="button"
                className="w-full text-left px-4 py-3 flex flex-col gap-0.5 hover:bg-gray-50 dark:hover:bg-[#252525] border-b border-gray-100 dark:border-[#252525] last:border-0 transition-colors"
                onClick={() => handleSelect(post.slug)}
              >
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {post.title}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {post.category} · {post.readingTime}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
