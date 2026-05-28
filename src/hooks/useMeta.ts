import { useEffect } from 'react'

interface MetaOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}

function setMeta(name: string, content: string) {
  // Handle both name= and property= meta tags
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
    ?? document.querySelector<HTMLMetaElement>(`meta[property="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    // OG tags use property=, others use name=
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function useMeta({ title, description, image, type = 'website' }: MetaOptions) {
  useEffect(() => {
    const siteImage = image ?? 'https://devanshu-patil.netlify.app/og-default.png'

    document.title = title

    setMeta('description', description)

    // Open Graph
    setMeta('og:title', title)
    setMeta('og:description', description)
    setMeta('og:image', siteImage)
    setMeta('og:type', type)

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', siteImage)
  }, [title, description, image, type])
}
