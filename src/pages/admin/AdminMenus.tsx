import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { deleteMenuItem, getAdminMenus, saveMenuItem } from "@/lib/cms/service";

const AdminMenus = () => {
  const queryClient = useQueryClient();
  const { data: menuItems = [] } = useQuery({ queryKey: ["admin", "menus"], queryFn: getAdminMenus });
  const [menuKey, setMenuKey] = useState("header");
  const [label, setLabel] = useState("");
  const [path, setPath] = useState("");
  const [position, setPosition] = useState(1);
  const [isCta, setIsCta] = useState(false);

  const saveMutation = useMutation({
    mutationFn: saveMenuItem,
    onSuccess: () => {
      setLabel("");
      setPath("");
      setPosition(1);
      setIsCta(false);
      queryClient.invalidateQueries({ queryKey: ["admin", "menus"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "menu", "header"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "menu", "footer"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "menus"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "menu", "header"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "menu", "footer"] });
    },
  });

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader><CardTitle>Add Menu Item</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <div className="space-y-2">
            <Label>Menu</Label>
            <Select value={menuKey} onValueChange={setMenuKey}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="header">Header</SelectItem>
                <SelectItem value="footer">Footer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Label</Label>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Path</Label>
            <Input value={path} onChange={(e) => setPath(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input type="number" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label>CTA</Label>
            <div className="h-10 flex items-center">
              <Checkbox checked={isCta} onCheckedChange={(checked) => setIsCta(Boolean(checked))} />
            </div>
          </div>
          <Button
            className="md:col-span-5 w-fit"
            onClick={() => saveMutation.mutate({ menu_key: menuKey, label, path, position, is_cta: isCta })}
            disabled={!label || !path || saveMutation.isPending}
          >
            Save Menu Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Menu Items</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id} className="border border-border rounded-lg p-3 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">{item.label} <span className="text-xs text-muted-foreground">({item.menu_key})</span></p>
                <p className="text-xs text-muted-foreground">{item.path} • position {item.position}</p>
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

export default AdminMenus;
