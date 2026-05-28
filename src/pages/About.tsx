import { useMeta } from '../hooks/useMeta'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function About() {
  const containerRef = useScrollReveal<HTMLElement>()

  useMeta({
    title: 'About Me — Devanshu Patil',
    description: 'Learn more about Devanshu Patil, a passionate full-stack developer sharing insights on user interface engineering, cloud infrastructure, and AI.',
  })

  return (
    <main 
      ref={containerRef}
      className="max-w-3xl mx-auto px-6 py-16 md:py-20 opacity-0 translate-y-4 transition-all duration-700"
    >
      <header className="mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-editorial-accent bg-editorial-accent/5 dark:bg-editorial-accent/15 px-3 py-1.5 rounded-full mb-4 inline-block">
          The Creator
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-editorial-text dark:text-gray-100 mb-4 tracking-tight leading-tight">
          About Devanshu Patil
        </h1>
        <div className="h-[2px] w-12 bg-editorial-accent mx-auto rounded-full" />
      </header>

      <section className="prose prose-neutral dark:prose-invert max-w-none text-editorial-text dark:text-gray-300 font-sans leading-relaxed space-y-6">
        <p className="text-lg text-editorial-muted dark:text-gray-400 font-serif italic mb-8 text-center leading-relaxed">
          "Learning daily, growing endlessly, sharing proudly."
        </p>

        <p>
          Hello! I'm <strong>Devanshu Patil</strong>, a passionate software developer dedicated to crafting modern, premium web applications that perfectly combine state-of-the-art backend engineering with elegant, responsive, and tactile user interfaces.
        </p>

        <h3 className="font-serif text-xl font-bold text-editorial-text dark:text-gray-100 pt-4">
          Why I Built This Space
        </h3>
        <p>
          Technology is evolving at a breakneck speed. Whether it's the rise of next-generation LLM interfaces, advances in reactive CSS layouts, or modern serverless cloud distribution, there is always something new to master.
        </p>
        <p>
          I established this editorial blog space to act as a living catalog of my learning. Here, I write high-quality, practical developer guides covering frontend user interfaces, backend APIs, distributed cloud architectures, and machine learning tools.
        </p>

        <h3 className="font-serif text-xl font-bold text-editorial-text dark:text-gray-100 pt-4">
          Core Pillars & Philosophy
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Design & Tactility:</strong> Interfaces should feel premium, responsive, and alive. Subtle animations and high-contrast editorial typography enhance readability and encourage interaction.
          </li>
          <li>
            <strong>Code Integrity:</strong> Building securely with sanitization, robust routing structures, and clean code paths as foundational principles.
          </li>
          <li>
            <strong>Sharing Knowledge:</strong> Explaining complex technical concepts in an accessible, visual, and developer-friendly format.
          </li>
        </ul>
      </section>
    </main>
  )
}
