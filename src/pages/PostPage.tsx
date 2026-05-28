import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../lib/posts'
import type { Post } from '../types/post'
import { CategoryBadge } from '../components/CategoryBadge'
import { SkeletonPost } from '../components/SkeletonPost'
import { useMeta } from '../hooks/useMeta'

// ─── Share Button ────────────────────────────────────────────────────────────
function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user dismissed, fall through
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err)
      // Fallback: show alert or toast notification
      alert('Copied to clipboard: ' + url)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-editorial-muted hover:text-editorial-accent transition-colors border border-cream-border dark:border-[#333] rounded-lg px-4 py-2 hover:border-editorial-accent/50"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-500 font-medium">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </>
      )}
    </button>
  )
}

// ─── Back to Top Button ───────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 bg-editorial-accent text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

// ─── Reading Progress Bar ─────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
      <div
        className="h-full bg-editorial-accent transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// ─── PostPage ─────────────────────────────────────────────────────────────────
export function PostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getPost(slug)
      .then((p) => {
        setPost(p)
        setLoading(false)
      })
      .catch(() => {
        setPost(null)
        setLoading(false)
      })
  }, [slug])

  useMeta({
    title: post ? `${post.title} — Devanshu Patil` : 'Devanshu Patil — Blog',
    description: post?.description ?? 'Read this article on Devanshu Patil\'s blog.',
    image: post?.image,
    type: 'article',
  })

  if (loading) return <SkeletonPost />

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-editorial-muted">Post not found.</p>
        <Link to="/blog" className="text-editorial-accent hover:underline mt-4 block">
          ← Back to all posts
        </Link>
      </main>
    )
  }

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <ReadingProgress />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/blog" className="text-sm text-editorial-muted hover:text-editorial-accent transition-colors">
            ← All posts
          </Link>
          <ShareButton title={post.title} url={window.location.href} />
        </div>

        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <CategoryBadge category={post.category} />
            <span className="text-editorial-muted text-sm">·</span>
            <span className="text-xs text-editorial-subtle">{post.proficiency}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-editorial-text leading-tight mb-4 dark:text-gray-100">
            {post.title}
          </h1>
          <p className="text-editorial-muted mb-4 leading-reading">{post.description}</p>
          <div className="text-xs text-editorial-subtle">
            {post.author} · {date} · {post.readingTime}
          </div>
        </header>

        {post.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <article
          className="prose prose-editorial max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-cream-border dark:border-[#222] flex items-center justify-between">
          <Link to="/blog" className="text-sm text-editorial-muted hover:text-editorial-accent transition-colors">
            ← All posts
          </Link>
          <ShareButton title={post.title} url={window.location.href} />
        </div>
      </main>
      <BackToTop />
    </>
  )
}
