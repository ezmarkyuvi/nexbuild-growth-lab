import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminSession } from "@/hooks/useAdminSession";

const AdminProtectedRoute = () => {
  const { isAuthenticated, loading } = useAdminSession();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading admin session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
