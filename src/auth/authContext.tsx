import jwtDecode from "jwt-decode";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

function AuthContextComponent(props: any) {
  const [loggedInToken, setLoggedInToken] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    

    if (!user && storedToken) {
      try {
        const decodedUser: any = jwtDecode(storedToken);
        setLoggedInToken(storedToken);
        setUser(decodedUser);
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoggedInToken(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ loggedInToken, setLoggedInToken, user, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };


