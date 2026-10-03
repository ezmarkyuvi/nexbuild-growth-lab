import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteMediaAsset, getAdminMedia, saveMediaAsset } from "@/lib/cms/service";

const AdminMedia = () => {
  const queryClient = useQueryClient();
  const { data: media = [] } = useQuery({ queryKey: ["admin", "media"], queryFn: getAdminMedia });
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");

  const saveMutation = useMutation({
    mutationFn: saveMediaAsset,
    onSuccess: () => {
      setName("");
      setUrl("");
      setAltText("");
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMediaAsset,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "media"] }),
  });

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Add Media Asset</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="space-y-2 md:col-span-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>URL</Label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-1">
            <Label>Alt text</Label>
            <Input value={altText} onChange={(e) => setAltText(e.target.value)} />
          </div>
          <Button
            className="md:col-span-4 w-fit"
            onClick={() => saveMutation.mutate({ name, url, alt_text: altText || null })}
            disabled={!name || !url || saveMutation.isPending}
          >
            Save Asset
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Media Library</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {media.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground truncate">{item.url}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(item.id)}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMedia;
