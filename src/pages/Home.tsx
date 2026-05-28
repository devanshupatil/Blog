import { Link } from 'react-router-dom'
import { FeaturedPost } from '../components/FeaturedPost'
import { AnimatedBlogCard } from '../components/AnimatedBlogCard'
import { getAllPosts, getFeaturedPost } from '../lib/posts'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMeta } from '../hooks/useMeta'

export function Home() {
  const heroRef = useScrollReveal<HTMLElement>()
  const featuredSectionRef = useScrollReveal<HTMLElement>(100)
  const recentSectionRef = useScrollReveal<HTMLElement>(150)

  useMeta({
    title: 'Devanshu Patil — Blog',
    description: 'A personal blog on frontend, backend, cloud, and AI — from a developer who builds and experiments daily.',
  })

  const featuredPost = getFeaturedPost()
  const allPosts = getAllPosts()

  // Filter out the featured post from the recent posts list, and limit to top 3 articles
  const recentPosts = allPosts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3)

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      
      {/* ── Hero Section ── */}
      <section 
        ref={heroRef} 
        className="mb-16 md:mb-20 text-center opacity-0 translate-y-4 transition-all duration-700"
      >
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-editorial-text leading-tight mb-5 dark:text-gray-100 max-w-4xl mx-auto tracking-tight">
          Learning daily, growing endlessly, sharing proudly.
        </h1>
        <p className="text-editorial-muted dark:text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          A personal blog on frontend, backend, cloud, and AI — from a developer who builds and experiments daily.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/blog"
            className="inline-block bg-editorial-accent text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-md shadow-editorial-accent/20"
          >
            Explore Articles
          </Link>
        </div>
      </section>

      {/* ── Featured Article Section ── */}
      {featuredPost && (
        <section 
          ref={featuredSectionRef} 
          className="mb-16 md:mb-20 opacity-0 translate-y-4 transition-all duration-700"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-cream-border dark:border-[#222]">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-editorial-text dark:text-gray-100">
              Featured Article
            </h2>
            <Link 
              to="/blog" 
              className="text-sm font-semibold text-editorial-accent hover:text-editorial-accent/80 transition-colors flex items-center gap-1 group"
            >
              View all posts 
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <FeaturedPost post={featuredPost} />
          </div>
        </section>
      )}

      {/* ── Recent Articles Grid Section ── */}
      {recentPosts.length > 0 && (
        <section 
          ref={recentSectionRef}
          className="mb-16 md:mb-20 opacity-0 translate-y-4 transition-all duration-700"
        >
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-cream-border dark:border-[#222]">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-editorial-text dark:text-gray-100">
              Recent Articles
            </h2>
            {(!featuredPost || recentPosts.length >= 3) && (
              <Link 
                to="/blog" 
                className="text-sm font-semibold text-editorial-accent hover:text-editorial-accent/80 transition-colors flex items-center gap-1 group"
              >
                All articles 
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <AnimatedBlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

    </main>
  )
}
