import { useEffect, useState } from "react";
import { FileText, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import type { AppDispatch, RootState } from "../../../store/store";
import { fetchBlogs, removeBlog, type Blog } from "../../../reducers/blogReducer";
import BlogEditor from "../blog/blog";

export default function BlogManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.blogs);
  const [editorBlog, setEditorBlog] = useState<Blog | null | undefined>(undefined);

  useEffect(() => { void dispatch(fetchBlogs()); }, [dispatch]);
  const handleDelete = async (blog: Blog) => { if (window.confirm(`Delete "${blog.title}"?`)) await dispatch(removeBlog(blog._id)); };
  if (editorBlog !== undefined) return <BlogEditor blog={editorBlog} onClose={() => setEditorBlog(undefined)} />;

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-start gap-3"><FileText className="mt-1 size-5" /><div><CardTitle>Blogs</CardTitle><CardDescription className="mt-1">Create, edit, and manage your published articles.</CardDescription></div></div>
        <Button onClick={() => setEditorBlog(null)}><Plus /> Create blog</Button>
      </CardHeader>
      <CardContent className="pt-6">
        {error && <p className="mb-4 text-sm text-destructive" role="alert">{error}</p>}
        <div className="flex justify-end pb-3"><Button variant="outline" size="sm" onClick={() => void dispatch(fetchBlogs())} disabled={loading}><RefreshCw className={loading ? "animate-spin" : ""} /> Refresh</Button></div>
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader><TableRow><TableHead>Blog</TableHead><TableHead>Author</TableHead><TableHead>Tags</TableHead><TableHead>Created</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((blog) => <TableRow key={blog._id}><TableCell><div className="flex items-center gap-3"><img src={blog.thumbnail} alt="" className="size-10 rounded object-cover" /><span className="max-w-sm truncate font-medium">{blog.title}</span></div></TableCell><TableCell>{blog.author}</TableCell><TableCell><Badge variant="secondary">{blog.metatags}</Badge></TableCell><TableCell className="text-muted-foreground">{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "-"}</TableCell><TableCell><div className="flex gap-1"><Button variant="ghost" size="icon" onClick={() => setEditorBlog(blog)} aria-label={`Edit ${blog.title}`}><Pencil /></Button><Button variant="ghost" size="icon" className="text-destructive" onClick={() => void handleDelete(blog)} aria-label={`Delete ${blog.title}`}><Trash2 /></Button></div></TableCell></TableRow>)}
              {!loading && items.length === 0 && <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No blogs found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
