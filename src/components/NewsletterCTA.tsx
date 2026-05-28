import { useState } from 'react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('submitted')
    setEmail('')
  }

  return (
    <section className="my-12 rounded-2xl border border-cream-border dark:border-[#222] bg-white dark:bg-[#141414] overflow-hidden">
      <div className="relative px-8 py-10">
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-editorial-accent via-orange-300 to-editorial-accent/40" />

        {status === 'submitted' ? (
          <div className="text-center py-4">
            <span className="text-4xl mb-4 block">✦</span>
            <h3 className="font-serif text-2xl font-bold text-editorial-text dark:text-gray-100 mb-2">
              You're in!
            </h3>
            <p className="text-editorial-muted text-sm">
              Thanks for subscribing. New articles will be delivered to your inbox as soon as they're published.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-editorial-accent mb-2">
                Newsletter
              </p>
              <h3 className="font-serif text-2xl font-bold text-editorial-text dark:text-gray-100 mb-1">
                Get new posts in your inbox
              </h3>
              <p className="text-sm text-editorial-muted">
                No noise. Just new articles on frontend, backend, cloud &amp; AI — whenever I publish.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 md:w-80"
            >
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="flex-1 bg-cream-light dark:bg-[#1f1f1f] border border-cream-border dark:border-[#333] rounded-lg px-4 py-2.5 text-sm text-editorial-text dark:text-gray-100 placeholder-editorial-subtle dark:placeholder-gray-500 outline-none focus:border-editorial-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-editorial-accent text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe →
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
