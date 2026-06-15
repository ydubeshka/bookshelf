import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

export function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("access_token");

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in!", {
        description: "You should log in to access this page",
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
