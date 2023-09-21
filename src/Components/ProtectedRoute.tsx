import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth/currentUser";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if ((user && user.role !== "admin") || !user) {
      toast.error("Você não tem acesso à essa pagina");
      navigate("/");
    }
  }, [navigate]);

  return <Component />;
}
