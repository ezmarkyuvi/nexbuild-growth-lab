import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Layers, Image, Menu, Settings, Inbox, LogOut } from "lucide-react";
import { adminLogout } from "@/lib/adminAuth";
import { useAdminSession } from "@/hooks/useAdminSession";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Pages", path: "/admin/pages", icon: Layers },
  { label: "Posts", path: "/admin/posts", icon: FileText },
  { label: "Media", path: "/admin/media", icon: Image },
  { label: "Menus", path: "/admin/menus", icon: Menu },
  { label: "Settings", path: "/admin/settings", icon: Settings },
  { label: "Leads", path: "/admin/leads", icon: Inbox },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAdminSession();

  const handleLogout = async () => {
    await adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-border bg-card min-h-screen p-4">
          <Link to="/admin" className="text-xl font-heading font-bold inline-block mb-8">
            CMS <span className="text-accent">Admin</span>
          </Link>
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    active ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-muted-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="p-5 lg:p-8">
          <header className="flex items-center justify-between mb-6 bg-card border border-border rounded-xl p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">WordPress-style CMS</p>
              <h1 className="font-heading text-lg font-semibold">
                {location.pathname.replace("/admin", "Admin") || "Admin"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{session?.email ?? ""}</p>
                <p className="text-xs text-muted-foreground">{session?.role ?? ""}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut size={14} className="mr-2" /> Logout
              </Button>
            </div>
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
