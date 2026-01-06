import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize, type MDXRemoteSerializeResult } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostAuthor {
  name: string
  avatar?: string
}

export interface PostFrontmatter {
  title: string
  date: string
  summary?: string
  image?: string
  tags?: string[]
  readTime?: string
  author?: PostAuthor
  published?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  mdxSource: MDXRemoteSerializeResult
}

export interface TOCHeading {
  id: string
  text: string
  level: number
}

/**
 * Get all blog post slugs
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  // Serialize MDX content for rendering
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
    },
  })

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content, // Keep raw content for TOC extraction
    mdxSource, // Serialized MDX for rendering
  }
}

/**
 * Get all posts, sorted by date
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      if (!post) return null
      // Filter out unpublished posts
      if (post.frontmatter.published === false) return null
      return post
    })
  )

  const validPosts = posts.filter((post): post is Post => post !== null)

  // Sort by date, newest first
  return validPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })
}

/**
 * Serialize MDX content for rendering
 */
export async function serializeMDX(content: string) {
  return serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
    },
  })
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => {
      tagsSet.add(tag.toLowerCase())
    })
  })

  return Array.from(tagsSet).sort()
}

/**
 * Get posts filtered by tag
 */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.frontmatter.tags?.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    )
  )
}

/**
 * Extract headings from MDX content for table of contents
 */
export function getHeadingsFromContent(content: string): TOCHeading[] {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const headings: TOCHeading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // Generate ID from text (same as rehype-slug)
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    headings.push({ id, text, level })
  }

  return headings
}

/**
 * Calculate read time based on content length
 */
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}



