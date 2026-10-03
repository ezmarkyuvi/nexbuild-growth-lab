import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardCounts } from "@/lib/cms/service";

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ["admin", "dashboard-counts"],
    queryFn: getDashboardCounts,
  });

  const stats = [
    { label: "Pages", value: data?.pages ?? 0 },
    { label: "Posts", value: data?.posts ?? 0 },
    { label: "Media", value: data?.media ?? 0 },
    { label: "Leads", value: data?.leads ?? 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-heading font-semibold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;
