import { Link } from 'react-router-dom'
import type { PostMeta } from '../types/post'

interface Props {
  post: PostMeta
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function getPostStatus(createdAt: string): { label: string; textColorClass: string } | null {
  const createdDate = new Date(createdAt)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - createdDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 180) {
    return { label: 'Fresh', textColorClass: 'text-green-600 dark:text-green-400' }
  } else if (diffDays <= 365 * 2) {
    return { label: 'Recent', textColorClass: 'text-blue-600 dark:text-blue-400' }
  }
  return null
}

export function BlogCard({ post }: Props) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const status = getPostStatus(post.createdAt)

  return (
    <Link
      to={`/blog/posts/${post.slug}`}
      className="group flex flex-col h-[480px] bg-white dark:bg-[#161616] border border-cream-border dark:border-[#222222] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-52 bg-cream-light dark:bg-[#1f1f1f] overflow-hidden">
{post.image ? (
  <img
    src={post.image}
    alt={post.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
      console.warn('Failed to load image:', (e.currentTarget as HTMLImageElement).src);
      (e.currentTarget as HTMLImageElement).onerror = null; // Prevent infinite loop
      (e.currentTarget as HTMLImageElement).src = '/assets/placeholder.webp'; // Fallback to placeholder
    }}
  />
) : (
  <div className="w-full h-full flex items-center justify-center text-editorial-subtle text-4xl">
    ✦
  </div>
)}
        {/* Category + reading time overlay */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-xs font-bold uppercase tracking-wider text-white bg-editorial-accent px-2 py-0.5 rounded">
            {post.category}
          </span>
          <span className="text-xs text-white/90">{post.readingTime}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h2 className="font-serif font-bold text-editorial-text dark:text-gray-100 leading-snug line-clamp-2 group-hover:text-editorial-accent transition-colors text-center">
          {post.title}
        </h2>
        <p className="text-sm text-editorial-muted dark:text-gray-400 line-clamp-3 leading-relaxed flex-1 text-center">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-cream-light dark:bg-[#1f1f1f] text-editorial-muted dark:text-gray-400 border border-cream-border dark:border-[#2a2a2a]"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs px-2 py-0.5 rounded-full bg-cream-light dark:bg-[#1f1f1f] text-editorial-subtle dark:text-gray-500 border border-cream-border dark:border-[#2a2a2a]">
              {post.proficiency}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-editorial-accent text-white text-xs font-bold flex items-center justify-center shrink-0">
              {initials(post.author)}
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-editorial-text dark:text-gray-200">
                {post.author}
              </p>
              <p className="text-xs text-editorial-subtle dark:text-gray-500">
                {post.authorTitle}
              </p>
            </div>
          </div>
           <div className="flex flex-col items-end leading-tight text-xs">
             <span className="text-editorial-subtle dark:text-gray-500">{date}</span>
             {status && (
               <span className={`flex items-center gap-1 font-medium ${status.textColorClass}`}>
                 <span className="text-[8px]">●</span>
                 <span>{status.label}</span>
               </span>
             )}
           </div>
        </div>
      </div>
    </Link>
  )
}
