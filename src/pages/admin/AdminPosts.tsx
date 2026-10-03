import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { deletePost, getAdminPosts, savePost } from "@/lib/cms/service";
import type { CMSPost } from "@/lib/cms/types";
import { useAdminSession } from "@/hooks/useAdminSession";

const emptyDraft = {
  title: "",
  slug: "",
  excerpt: "",
  category: "General",
  status: "draft",
  seo_title: "",
  seo_description: "",
  content_json: JSON.stringify({ sections: [] }, null, 2),
};

const AdminPosts = () => {
  const queryClient = useQueryClient();
  const { session } = useAdminSession();
  const { data: posts = [] } = useQuery({ queryKey: ["admin", "posts"], queryFn: getAdminPosts });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyDraft);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedId) ?? null,
    [posts, selectedId],
  );

  const mutation = useMutation({
    mutationFn: savePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "posts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      setSelectedId(null);
      queryClient.invalidateQueries({ queryKey: ["admin", "posts"] });
    },
  });

  const startCreate = () => {
    setSelectedId(null);
    setDraft(emptyDraft);
  };

  const editPost = (post: CMSPost) => {
    setSelectedId(post.id);
    setDraft({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      seo_title: post.seo_title ?? "",
      seo_description: post.seo_description ?? "",
      content_json: JSON.stringify(post.content_json, null, 2),
    });
  };

  const handleSave = async () => {
    let parsedContent: unknown = {};

    try {
      parsedContent = JSON.parse(draft.content_json);
    } catch {
      return;
    }

    await mutation.mutateAsync({
      id: selectedId ?? undefined,
      title: draft.title,
      slug: draft.slug,
      excerpt: draft.excerpt,
      category: draft.category,
      status: draft.status as "draft" | "published",
      seo_title: draft.seo_title || null,
      seo_description: draft.seo_description || null,
      content_json: parsedContent as never,
      published_at: draft.status === "published" ? new Date().toISOString() : null,
      updated_by: session?.userId ?? null,
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Posts</CardTitle>
          <Button size="sm" onClick={startCreate}><Plus size={14} className="mr-2" />New</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => editPost(post)}
              className="w-full text-left border border-border rounded-lg p-3 hover:border-accent"
            >
              <p className="font-medium">{post.title}</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                <Badge variant={post.status === "published" ? "default" : "outline"}>{post.status}</Badge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{selectedId ? "Edit Post" : "Create Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={draft.title} onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={draft.slug} onChange={(e) => setDraft((prev) => ({ ...prev, slug: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={draft.category} onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={draft.status}
                onValueChange={(status) => setDraft((prev) => ({ ...prev, status }))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea value={draft.excerpt} onChange={(e) => setDraft((prev) => ({ ...prev, excerpt: e.target.value }))} rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input value={draft.seo_title} onChange={(e) => setDraft((prev) => ({ ...prev, seo_title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>SEO Description</Label>
              <Input value={draft.seo_description} onChange={(e) => setDraft((prev) => ({ ...prev, seo_description: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Content JSON</Label>
            <Textarea value={draft.content_json} onChange={(e) => setDraft((prev) => ({ ...prev, content_json: e.target.value }))} rows={15} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={mutation.isPending}>{mutation.isPending ? "Saving..." : "Save Post"}</Button>
            {selectedPost ? (
              <Button
                variant="destructive"
                onClick={() => deleteMutation.mutate(selectedPost.id)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 size={14} className="mr-2" /> Delete
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPosts;
