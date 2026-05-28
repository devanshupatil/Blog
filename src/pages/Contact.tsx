import { useState } from 'react'
import { useMeta } from '../hooks/useMeta'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Contact() {
  const containerRef = useScrollReveal<HTMLElement>()
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useMeta({
    title: 'Contact Me — Devanshu Patil',
    description: 'Get in touch with Devanshu Patil for web development consulting, writing collaborations, or project inquiries.',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true)
    }
  }

  return (
    <main 
      ref={containerRef}
      className="max-w-3xl mx-auto px-6 py-16 md:py-20 opacity-0 translate-y-4 transition-all duration-700"
    >
      <header className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-editorial-accent bg-editorial-accent/5 dark:bg-editorial-accent/15 px-3 py-1.5 rounded-full mb-4 inline-block">
          Get In Touch
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-editorial-text dark:text-gray-100 mb-4 tracking-tight leading-tight">
          Let's Collaborate
        </h1>
        <p className="text-editorial-muted dark:text-gray-400 max-w-lg mx-auto text-base">
          Have an idea, project inquiry, or want to discuss web engineering? Drop me a line below!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Area: Info card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-cream-light/60 dark:bg-[#161616] border border-cream-border dark:border-[#222] rounded-xl p-5">
            <h3 className="font-serif text-lg font-bold text-editorial-text dark:text-gray-100 mb-3">
              Direct Contact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-editorial-subtle dark:text-gray-500 uppercase font-bold tracking-wider">Email</p>
                <a href="mailto:devanshupatil602@gmail.com" className="text-sm font-medium text-editorial-accent hover:underline break-all">
                  devanshupatil602@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs text-editorial-subtle dark:text-gray-500 uppercase font-bold tracking-wider">Location</p>
                <p className="text-sm text-editorial-text dark:text-gray-300 font-medium">Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800/30 rounded-xl p-8 text-center animate-fade-in">
              <span className="text-3xl mb-3 block">✉️</span>
              <h3 className="font-serif text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-500 max-w-sm mx-auto">
                Thank you so much for reaching out. I'll review your inquiry and get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-editorial-muted dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-border dark:border-[#333] bg-white dark:bg-[#161616] text-editorial-text dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-editorial-accent/25 focus:border-editorial-accent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-editorial-muted dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-border dark:border-[#333] bg-white dark:bg-[#161616] text-editorial-text dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-editorial-accent/25 focus:border-editorial-accent transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-editorial-muted dark:text-gray-400 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-border dark:border-[#333] bg-white dark:bg-[#161616] text-editorial-text dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-editorial-accent/25 focus:border-editorial-accent transition-all duration-200 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-editorial-accent hover:bg-editorial-accent/90 active:scale-[0.99] text-white font-semibold py-2.5 px-6 rounded-lg text-sm transition-all duration-150 shadow-md shadow-editorial-accent/20"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  )
}
