import { createContext,  useState, useEffect } from "react";
import { api } from "../api";

const UserContext = createContext<any>(null);


 function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<Object | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/currentUser");
      setUser(response.data);
    }
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export {UserContext, UserContextProvider}