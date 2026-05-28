import { useScrollReveal } from '../hooks/useScrollReveal'
import { BlogCard } from './BlogCard'
import type { PostMeta } from '../types/post'

interface Props {
  post: PostMeta
  index: number
}

export function AnimatedBlogCard({ post, index }: Props) {
  // Stagger each card by 60ms × its column position (capped at 3 columns)
  const delay = (index % 3) * 60
  const ref = useScrollReveal<HTMLDivElement>(delay)

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-500"
    >
      <BlogCard post={post} />
    </div>
  )
}
