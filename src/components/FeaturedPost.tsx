import { Link } from 'react-router-dom'
import type { PostMeta } from '../types/post'

interface Props {
  post: PostMeta
}

export function FeaturedPost({ post }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <article className="group bg-white border border-cream-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 dark:bg-[#161616] dark:border-[#222222]">
      {/* Cover image */}
      {post.image && (
        <div className="relative h-56 overflow-hidden bg-cream-light dark:bg-[#1f1f1f]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-wider text-white bg-editorial-accent px-2 py-0.5 rounded">
            ✦ Featured
          </span>
        </div>
      )}

      <div className="p-6">
        {/* Category row (shown when no image) */}
        {!post.image && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-editorial-accent font-semibold text-sm">✦ Featured</span>
            <span className="text-editorial-muted text-sm">·</span>
            <span className="text-editorial-accent text-sm font-medium uppercase tracking-wide">
              {post.category}
            </span>
          </div>
        )}
        {post.image && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-editorial-accent text-sm font-medium uppercase tracking-wide">
              {post.category}
            </span>
          </div>
        )}

        <Link to={`/blog/posts/${post.slug}`}>
          <h2 className="font-serif text-2xl font-bold text-editorial-text hover:text-editorial-accent transition-colors leading-snug mb-2 dark:text-gray-100">
            {post.title}
          </h2>
        </Link>
        <p className="text-editorial-muted line-clamp-2 mb-4 text-sm leading-reading">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-editorial-subtle">
            {date} · {post.readingTime}
          </div>
          <Link
            to={`/blog/posts/${post.slug}`}
            className="text-xs font-semibold text-editorial-accent hover:underline"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  )
}
