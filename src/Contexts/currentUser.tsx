import { createContext, useState, useEffect } from 'react';
import { api } from '../api';
import { User } from '../interfaces';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchUser() {
      const response = await api.get('/currentUser', {
        withCredentials: true,
      });
      setUser(response.data);
      console.log(response.data);
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
