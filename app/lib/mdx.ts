import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostFrontmatter {
  title: string
  date: string
  summary?: string
  published?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
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

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
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



