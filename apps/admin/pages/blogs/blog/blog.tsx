import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import type { AppDispatch } from "../../../store/store";
import { addBlog, editBlog, type Blog } from "../../../reducers/blogReducer";

type BlogEditorProps = { blog?: Blog | null; onClose: () => void };
const emptyForm = { title: "", body: "", author: "", metatags: "", thumbnail: "" };

export default function Blog({ blog, onClose }: BlogEditorProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState(emptyForm);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  useEffect(() => {
    setForm(blog ? { title: blog.title, body: blog.body, author: blog.author, metatags: blog.metatags, thumbnail: blog.thumbnail } : emptyForm);
    setThumbnailFile(null);
  }, [blog]);

  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (blog) {
      const result = await dispatch(editBlog({ ...blog, ...form, id: blog._id, thumbnailFile: thumbnailFile ?? undefined }));
      if (editBlog.fulfilled.match(result)) onClose();
      return;
    }
    if (!thumbnailFile) return;
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    payload.set("thumbnail", thumbnailFile);
    const result = await dispatch(addBlog(payload));
    if (addBlog.fulfilled.match(result)) onClose();
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle>{blog ? "Edit blog" : "Create a new blog"}</CardTitle>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close editor"><X /></Button>
      </CardHeader>
      <CardContent className="pt-6">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-2"><Label htmlFor="blog-title">Title</Label><Input id="blog-title" value={form.title} onChange={(event) => updateField("title", event.target.value)} required /></div>
          <div className="grid gap-2"><Label htmlFor="blog-body">Body</Label><Textarea id="blog-body" className="min-h-48" value={form.body} onChange={(event) => updateField("body", event.target.value)} required /></div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2"><Label htmlFor="blog-author">Author</Label><Input id="blog-author" value={form.author} onChange={(event) => updateField("author", event.target.value)} required /></div>
            <div className="grid gap-2"><Label htmlFor="blog-metatags">Meta tags</Label><Input id="blog-metatags" placeholder="react, typescript, web" value={form.metatags} onChange={(event) => updateField("metatags", event.target.value)} required /></div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="blog-thumbnail">Thumbnail</Label>
            <Input id="blog-thumbnail" type="file" accept="image/*" onChange={(event) => setThumbnailFile(event.target.files?.[0] ?? null)} required={!blog} />
            {blog && form.thumbnail && <img src={form.thumbnail} alt="Current thumbnail" className="h-24 w-40 rounded-md object-cover" />}
          </div>
          <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit"><Save /> {blog ? "Save changes" : "Publish blog"}</Button></div>
        </form>
      </CardContent>
    </Card>
  );
}
