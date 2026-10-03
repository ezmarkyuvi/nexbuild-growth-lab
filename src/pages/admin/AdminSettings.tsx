import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listSiteSettingsRows, saveSiteSetting } from "@/lib/cms/service";
import { useAdminSession } from "@/hooks/useAdminSession";

const defaultSettingKeys = [
  "brand_name",
  "brand_tagline",
  "primary_cta_label",
  "primary_cta_link",
  "contact_email",
  "contact_phone",
  "website_url",
];

const AdminSettings = () => {
  const queryClient = useQueryClient();
  const { session } = useAdminSession();
  const { data: rows = [] } = useQuery({ queryKey: ["admin", "site-settings"], queryFn: listSiteSettingsRows });
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const settingMap = useMemo(() => {
    const result: Record<string, string> = {};
    for (const key of defaultSettingKeys) {
      const row = rows.find((item) => item.key === key);
      result[key] = row?.value_json?.toString() ?? "";
    }
    return result;
  }, [rows]);

  const mutation = useMutation({
    mutationFn: saveSiteSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["cms", "site-settings"] });
    },
  });

  const getValue = (key: string) => drafts[key] ?? settingMap[key] ?? "";

  const saveKey = async (key: string) => {
    await mutation.mutateAsync({
      key,
      value_json: getValue(key),
      updated_by: session?.userId ?? null,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {defaultSettingKeys.map((key) => (
          <div key={key} className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-3 items-end">
            <div>
              <Label>{key}</Label>
            </div>
            <Input
              value={getValue(key)}
              onChange={(e) => setDrafts((prev) => ({ ...prev, [key]: e.target.value }))}
            />
            <Button onClick={() => saveKey(key)} disabled={mutation.isPending}>Save</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
