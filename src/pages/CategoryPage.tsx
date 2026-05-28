import { useParams } from 'react-router-dom'
import { getPostsByCategory } from '../lib/posts'
import { BlogCard } from '../components/BlogCard'
import { useMeta } from '../hooks/useMeta'

const CATEGORY_META: Record<string, { label: string; subtitle: string }> = {
  frontend: {
    label: 'Frontend',
    subtitle: 'Articles on UI, frameworks, and the web platform',
  },
  backend: {
    label: 'Backend',
    subtitle: 'Server-side patterns, APIs, and databases',
  },
  cloud: {
    label: 'Cloud',
    subtitle: 'Infrastructure, deployment, and cloud services',
  },
  ai: {
    label: 'AI',
    subtitle: 'Machine learning, LLMs, and AI-powered tools',
  },
}

export function CategoryPage() {
  const { category = '' } = useParams<{ category: string }>()
  const meta = CATEGORY_META[category.toLowerCase()]
  const posts = getPostsByCategory(category)

  useMeta({
    title: meta ? `${meta.label} — Devanshu Patil` : 'Category Not Found',
    description: meta
      ? `${meta.subtitle}. ${posts.length} articles.`
      : 'This category does not exist.',
  })

  if (!meta) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-editorial-muted">Category not found.</p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold text-editorial-text mb-2 dark:text-gray-100">
        {meta.label}
      </h1>
      <p className="text-editorial-muted mb-1">{meta.subtitle}</p>
      <p className="text-editorial-muted text-sm mb-8">{posts.length} articles</p>
      {posts.length === 0 ? (
        <p className="text-editorial-muted">No posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}
