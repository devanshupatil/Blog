import { Link } from 'react-router-dom'
import type { PostMeta } from '../types/post'
import { CategoryBadge } from './CategoryBadge'

interface Props {
  post: PostMeta
}

export function PostRow({ post }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex items-baseline gap-3 py-4 border-b border-cream-border dark:border-[#222222] last:border-0">
      <CategoryBadge category={post.category} />
      <span className="text-editorial-muted text-sm">·</span>
      <Link
        to={`/blog/posts/${post.slug}`}
        className="flex-1 font-semibold text-editorial-text hover:text-editorial-accent transition-colors"
      >
        {post.title}
      </Link>
      <span className="text-xs text-editorial-subtle whitespace-nowrap ml-auto">
        {date} · {post.readingTime}
      </span>
    </div>
  )
}
