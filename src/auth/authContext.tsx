import { createContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

function AuthContextComponent(props: any) {
  const [loggedInToken, setLoggedInToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        setLoggedInToken(storedToken);
      } catch (err) {
        console.log(err);
      }
    } else {
        setLoggedInToken(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedInToken, setLoggedInToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };