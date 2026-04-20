const BASE  = 'https://api.github.com'
const OWNER = process.env.GITHUB_OWNER!
const REPO  = process.env.GITHUB_REPO!
const BRANCH = process.env.GITHUB_BRANCH ?? 'main'
const TOKEN = process.env.GITHUB_TOKEN!

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
}

export type GitHubFile = {
  name: string
  path: string
  sha: string
  download_url: string
}

// List all .mdx files in content/blog
export async function listBlogFiles(): Promise<GitHubFile[]> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/content/blog?ref=${BRANCH}`,
    { headers, cache: 'no-store' }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data as GitHubFile[]).filter((f) => f.name.endsWith('.mdx'))
}

// Get a single file content + sha
export async function getBlogFile(slug: string): Promise<{ content: string; sha: string } | null> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.mdx?ref=${BRANCH}`,
    { headers, cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return {
    content: Buffer.from(data.content, 'base64').toString('utf-8'),
    sha: data.sha,
  }
}

// Create a new file
export async function createBlogFile(slug: string, content: string): Promise<boolean> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.mdx`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `feat: add blog post "${slug}"`,
        content: Buffer.from(content).toString('base64'),
        branch: BRANCH,
      }),
    }
  )
  return res.ok
}

// Update an existing file (requires sha)
export async function updateBlogFile(slug: string, content: string, sha: string): Promise<boolean> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.mdx`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `chore: update blog post "${slug}"`,
        content: Buffer.from(content).toString('base64'),
        sha,
        branch: BRANCH,
      }),
    }
  )
  return res.ok
}

// Delete a file
export async function deleteBlogFile(slug: string, sha: string): Promise<boolean> {
  const res = await fetch(
    `${BASE}/repos/${OWNER}/${REPO}/contents/content/blog/${slug}.mdx`,
    {
      method: 'DELETE',
      headers,
      body: JSON.stringify({
        message: `chore: delete blog post "${slug}"`,
        sha,
        branch: BRANCH,
      }),
    }
  )
  return res.ok
}