export type Blog = {
  _id: string;
  title: string;
  body: string;
  thumbnail: string;
  author: string;
  metatags: string;
  createdAt: string;
  updatedAt: string;
};

type BlogsResponse = { data?: Blog[] };
type BlogResponse = { data?: Blog };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_URL}/api/v1/blogs`, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Unable to load blogs: ${response.status}`);
  const result = (await response.json()) as BlogsResponse;
  return result.data || [];
}

export async function getBlog(title: string): Promise<Blog | null> {
  const response = await fetch(
    `${API_URL}/api/v1/blog/${encodeURIComponent(title)}`,
    { cache: "force-cache" },
  );
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Unable to load blog: ${response.status}`);
  const result = (await response.json()) as BlogResponse;
  return result.data || null;
}

export function getBlogCategories(blogs: Blog[]) {
  return [
    "All",
    ...Array.from(
      new Set(
        blogs.flatMap((blog) =>
          blog.metatags.split(",").map((tag) => tag.trim()).filter(Boolean),
        ),
      ),
    ),
  ];
}