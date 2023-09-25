import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../auth/currentUser";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

export function ProtectedRoute({ component: Component }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const userRef = useRef(user);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        if (userRef.current?.role !== "admin" || !userRef.current) {
          toast.error("Você não tem acesso à essa pagina");
          navigate("/");
        }
      }, 3000);
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao verificar sua permissão de acesso");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Component />;
}
