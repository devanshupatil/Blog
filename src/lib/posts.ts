import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import type { PostMeta, Post } from '../types/post'

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'video', 'source'],
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    span: [...(defaultSchema.attributes?.span ?? []), 'className'],
    pre:  [...(defaultSchema.attributes?.pre  ?? []), 'className'],
    // Allow img tags with relative src paths (default schema only allows http/https)
    img:  ['src', 'alt', 'title', 'width', 'height'],
    video: ['src', 'controls', 'autoplay', 'loop', 'muted', 'playsinline', 'preload', 'width', 'height', 'className', 'class', 'poster', 'style'],
    source: ['src', 'type'],
    div: ['className', 'class', 'style'],
  },
}

const modules = import.meta.glob('/content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path
    .replace('/content/blog/', '')
    .replace(/\.md$/, '')
    .replace(/\//g, '-')
}

export function getAllPosts(): PostMeta[] {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { data } = matter(raw)
      return {
        ...(data as Omit<PostMeta, 'slug'>),
        slug: slugFromPath(path),
      }
    })
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  )
}

export async function getPost(slug: string): Promise<Post | null> {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug,
  )
  if (!entry) return null

  const [, raw] = entry
  const { data, content } = matter(raw)

  const processed = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return {
    ...(data as Omit<PostMeta, 'slug'>),
    slug,
    contentHtml: processed.toString(),
  }
}

export function getFeaturedPost(): PostMeta | null {
  const all = getAllPosts()
  return all.find((p) => p.featured) ?? all[0] ?? null
}
