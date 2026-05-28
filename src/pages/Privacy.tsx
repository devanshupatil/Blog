import { useMeta } from '../hooks/useMeta'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Privacy() {
  const containerRef = useScrollReveal<HTMLElement>()

  useMeta({
    title: 'Privacy Policy — Devanshu Patil',
    description: 'Privacy policy and data protection terms for Devanshu Patil\'s personal blog.',
  })

  return (
    <main 
      ref={containerRef}
      className="max-w-3xl mx-auto px-6 py-16 md:py-20 opacity-0 translate-y-4 transition-all duration-700"
    >
      <header className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-editorial-accent bg-editorial-accent/5 dark:bg-editorial-accent/15 px-3 py-1.5 rounded-full mb-4 inline-block">
          Legal
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-editorial-text dark:text-gray-100 mb-4 tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="text-editorial-muted dark:text-gray-400 text-xs font-sans">
          Last Updated: May 28, 2026
        </p>
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none text-editorial-text dark:text-gray-300 font-sans leading-relaxed space-y-6">
        <p>
          Your privacy is extremely important to me. This Privacy Policy details the types of personal information that is collected and recorded by this personal blog website and how it is protected.
        </p>

        <h3 className="font-serif text-lg font-bold text-editorial-text dark:text-gray-100 pt-4">
          1. Information Collection
        </h3>
        <p>
          We collect personal information only when you explicitly provide it:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Newsletter Subscriptions:</strong> If you choose to subscribe to our email newsletter, we collect your email address solely to send you new blog post notifications.
          </li>
          <li>
            <strong>Contact Form:</strong> If you submit an inquiry via our contact form, we collect your name, email address, and message to communicate back with you.
          </li>
        </ul>

        <h3 className="font-serif text-lg font-bold text-editorial-text dark:text-gray-100 pt-4">
          2. Data Usage
        </h3>
        <p>
          Your collected information is never sold, leased, shared, or distributed to any third parties. It is strictly used to deliver newsletter communications or address your direct inquiries.
        </p>

        <h3 className="font-serif text-lg font-bold text-editorial-text dark:text-gray-100 pt-4">
          3. Analytical Logs & Cookies
        </h3>
        <p>
          This website runs as a fully optimized static application. We do not use intrusive tracking scripts or cross-site cookie profiling. Simple, anonymous server logging may occur strictly to analyze loading performance and routing integrity.
        </p>

        <h3 className="font-serif text-lg font-bold text-editorial-text dark:text-gray-100 pt-4">
          4. Policy Consent
        </h3>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>
      </section>
    </main>
  )
}
