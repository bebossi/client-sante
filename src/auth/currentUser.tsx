import { createContext, useState, useEffect } from "react";
import { api } from "../api";
import { User } from "../interfaces";

const UserContext = createContext<any>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  console.log(user)
  useEffect(() => {
    async function fetchUser() {
      const response = await api.get("/currentUser", {
        withCredentials: true,
      });
      setUser(response.data);
    }
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
