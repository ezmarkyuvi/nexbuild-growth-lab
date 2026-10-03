import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  deletePageSection,
  getAdminPages,
  getPageSections,
  savePage,
  savePageSection,
} from "@/lib/cms/service";
import type { CMSPage, CMSPageSection } from "@/lib/cms/types";
import { useAdminSession } from "@/hooks/useAdminSession";

const emptyPage = {
  title: "",
  slug: "",
  status: "draft",
  layout_mode: "default",
  meta_title: "",
  meta_description: "",
};

const newSectionDraft = {
  section_key: "section-1",
  title: "New section",
  position: 1,
  status: "draft",
  content_json: JSON.stringify({ heading: "", body: "", bullets: [] }, null, 2),
};

const AdminPages = () => {
  const queryClient = useQueryClient();
  const { session } = useAdminSession();
  const { data: pages = [] } = useQuery({ queryKey: ["admin", "pages"], queryFn: getAdminPages });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState(emptyPage);
  const [sectionDraft, setSectionDraft] = useState(newSectionDraft);

  const selectedPage = useMemo(() => pages.find((page) => page.id === selectedId) ?? null, [pages, selectedId]);

  const { data: sections = [] } = useQuery({
    queryKey: ["admin", "page-sections", selectedId],
    queryFn: () => getPageSections(selectedId as string),
    enabled: Boolean(selectedId),
  });

  useEffect(() => {
    if (!selectedPage) return;
    setDraft({
      title: selectedPage.title,
      slug: selectedPage.slug,
      status: selectedPage.status,
      layout_mode: selectedPage.layout_mode,
      meta_title: selectedPage.meta_title ?? "",
      meta_description: selectedPage.meta_description ?? "",
    });
  }, [selectedPage]);

  const pageMutation = useMutation({
    mutationFn: savePage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "pages"] }),
  });

  const sectionMutation = useMutation({
    mutationFn: savePageSection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "page-sections", selectedId] }),
  });

  const sectionDeleteMutation = useMutation({
    mutationFn: deletePageSection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "page-sections", selectedId] }),
  });

  const startCreate = () => {
    setSelectedId(null);
    setDraft(emptyPage);
    setSectionDraft(newSectionDraft);
  };

  const pickPage = (page: CMSPage) => {
    setSelectedId(page.id);
  };

  const handleSavePage = async () => {
    await pageMutation.mutateAsync({
      id: selectedId ?? undefined,
      title: draft.title,
      slug: draft.slug,
      status: draft.status as "draft" | "published",
      layout_mode: draft.layout_mode as "default" | "cms",
      meta_title: draft.meta_title || null,
      meta_description: draft.meta_description || null,
      updated_by: session?.userId ?? null,
    });
  };

  const saveSection = async () => {
    if (!selectedId) return;

    let parsedContent: unknown = {};
    try {
      parsedContent = JSON.parse(sectionDraft.content_json);
    } catch {
      return;
    }

    await sectionMutation.mutateAsync({
      page_id: selectedId,
      section_key: sectionDraft.section_key,
      title: sectionDraft.title,
      position: Number(sectionDraft.position),
      status: sectionDraft.status as "draft" | "published",
      content_json: parsedContent as never,
    });

    setSectionDraft((prev) => ({ ...prev, section_key: `${prev.section_key}-new` }));
  };

  const editSection = (section: CMSPageSection) => {
    setSectionDraft({
      section_key: section.section_key,
      title: section.title,
      position: section.position,
      status: section.status,
      content_json: JSON.stringify(section.content_json, null, 2),
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pages</CardTitle>
          <Button size="sm" onClick={startCreate}><Plus size={14} className="mr-2" />New</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => pickPage(page)}
              className="w-full border border-border rounded-lg p-3 text-left hover:border-accent"
            >
              <p className="font-medium">{page.title}</p>
              <div className="mt-2 flex gap-2">
                <Badge variant="secondary">/{page.slug}</Badge>
                <Badge variant={page.status === "published" ? "default" : "outline"}>{page.status}</Badge>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>{selectedId ? "Edit Page" : "Create Page"}</CardTitle>
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
                <Label>Status</Label>
                <Select value={draft.status} onValueChange={(status) => setDraft((prev) => ({ ...prev, status }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Layout Mode</Label>
                <Select value={draft.layout_mode} onValueChange={(layout_mode) => setDraft((prev) => ({ ...prev, layout_mode }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (coded)</SelectItem>
                    <SelectItem value="cms">CMS (section blocks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Meta title</Label>
              <Input value={draft.meta_title} onChange={(e) => setDraft((prev) => ({ ...prev, meta_title: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Meta description</Label>
              <Textarea value={draft.meta_description} onChange={(e) => setDraft((prev) => ({ ...prev, meta_description: e.target.value }))} />
            </div>
            <Button onClick={handleSavePage} disabled={pageMutation.isPending}>{pageMutation.isPending ? "Saving..." : "Save Page"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Sections (for CMS mode)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Section key</Label>
                <Input value={sectionDraft.section_key} onChange={(e) => setSectionDraft((prev) => ({ ...prev, section_key: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={sectionDraft.title} onChange={(e) => setSectionDraft((prev) => ({ ...prev, title: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Position</Label>
                <Input type="number" value={sectionDraft.position} onChange={(e) => setSectionDraft((prev) => ({ ...prev, position: Number(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={sectionDraft.status} onValueChange={(status) => setSectionDraft((prev) => ({ ...prev, status }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content JSON</Label>
              <Textarea value={sectionDraft.content_json} onChange={(e) => setSectionDraft((prev) => ({ ...prev, content_json: e.target.value }))} rows={8} />
            </div>
            <Button onClick={saveSection} disabled={!selectedId || sectionMutation.isPending}>Save Section</Button>

            <div className="space-y-2 pt-2">
              {sections.map((section) => (
                <div key={section.id} className="border border-border rounded-lg p-3">
                  <div className="flex justify-between items-start gap-2">
                    <button onClick={() => editSection(section)} className="text-left">
                      <p className="font-medium">{section.title}</p>
                      <p className="text-xs text-muted-foreground">{section.section_key} • {section.status}</p>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => sectionDeleteMutation.mutate(section.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPages;
