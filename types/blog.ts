export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  readingTime: string
  published: boolean
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}