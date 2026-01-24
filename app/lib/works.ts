import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import remarkGfm from "remark-gfm"

const worksDirectory = path.join(process.cwd(), "content/works")

export interface WorkFrontmatter {
  title: string
  summary: string
  date: string
  image?: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  published?: boolean
}

export interface Work {
  slug: string
  frontmatter: WorkFrontmatter
  content: string
  mdxSource: MDXRemoteSerializeResult
}

export interface TOCHeading {
  id: string
  text: string
  level: number
}

/**
 * Get all work slugs
 */
export function getWorkSlugs(): string[] {
  if (!fs.existsSync(worksDirectory)) {
    return []
  }
  return fs
    .readdirSync(worksDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

/**
 * Get a single work by slug
 */
export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const fullPath = path.join(worksDirectory, `${slug}.mdx`)

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
    frontmatter: data as WorkFrontmatter,
    content,
    mdxSource,
  }
}

/**
 * Get all works, sorted by date
 */
export async function getAllWorks(): Promise<Work[]> {
  const slugs = getWorkSlugs()
  const works = await Promise.all(
    slugs.map(async (slug) => {
      const work = await getWorkBySlug(slug)
      if (!work) return null
      // Filter out unpublished works
      if (work.frontmatter.published === false) return null
      return work
    })
  )

  const validWorks = works.filter((work): work is Work => work !== null)

  // Sort by date, newest first
  return validWorks.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return dateB - dateA
  })
}

/**
 * Get featured works for home page
 */
export async function getFeaturedWorks(): Promise<Work[]> {
  const works = await getAllWorks()
  return works.filter((work) => work.frontmatter.featured === true)
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
