import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeads, updateLeadStatus } from "@/lib/cms/service";

const statuses = ["new", "contacted", "closed"];

const AdminLeads = () => {
  const queryClient = useQueryClient();
  const { data: leads = [] } = useQuery({ queryKey: ["admin", "leads"], queryFn: getLeads });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateLeadStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "leads"] }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leads.length === 0 ? <p className="text-sm text-muted-foreground">No leads found in database.</p> : null}
        {leads.map((lead) => (
          <div key={lead.id} className="border border-border rounded-lg p-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-muted-foreground">{lead.email}</p>
                <p className="text-sm text-muted-foreground">{lead.website || "No website"}</p>
              </div>
              <Badge variant="outline">{lead.status || "new"}</Badge>
            </div>
            <div className="mt-3 flex gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant="secondary"
                  size="sm"
                  onClick={() => mutation.mutate({ id: lead.id, status })}
                >
                  Mark {status}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AdminLeads;
