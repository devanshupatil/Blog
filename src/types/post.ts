export interface PostMeta {
  slug: string
  title: string
  description: string
  category: string
  published: boolean
  createdAt: string
  image: string
  author: string
  authorTitle: string
  readingTime: string
  tags: string[]
  proficiency: string
  featured?: boolean
}

export interface Post extends PostMeta {
  contentHtml: string
}
