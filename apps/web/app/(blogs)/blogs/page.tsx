import { BlogList } from "./BlogList";
import { getBlogs } from "@/lib/blogs";

export const dynamic = "force-static";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return <BlogList blogs={blogs} />;
}
