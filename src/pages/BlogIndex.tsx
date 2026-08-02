import { useState } from 'react'
import { getAllPosts } from '../lib/posts'
import { useMeta } from '../hooks/useMeta'
import { AnimatedBlogCard } from '../components/AnimatedBlogCard'

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Cloud', 'AI'] as const
type CategoryFilter = (typeof CATEGORIES)[number]

export function BlogIndex() {
  const allPosts = getAllPosts()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')

  const posts =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())

  useMeta({
    title: 'All Posts — Devanshu Patil',
    description: `${allPosts.length} articles covering frontend, backend, cloud, and AI development.`,
  })

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-editorial-text mb-2 dark:text-gray-100">
        All Posts
      </h1>
      <p className="text-editorial-muted mb-8">{allPosts.length} articles</p>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={[
              'text-sm font-medium px-4 py-2 rounded-full border transition-all duration-150',
              activeCategory === cat
                ? 'bg-editorial-accent text-white border-editorial-accent'
                : 'border-cream-border dark:border-[#333] text-editorial-muted hover:border-editorial-accent hover:text-editorial-accent dark:hover:border-editorial-accent',
            ].join(' ')}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-xs opacity-70">
                ({allPosts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {posts.length === 0 ? (
        <p className="text-editorial-muted">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedBlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </main>
  )
}
