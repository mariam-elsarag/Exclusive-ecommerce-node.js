import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);
const AppProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token"));
  const [user, setUser] = useState(Cookies.get("full_name"));

  // functions
  // login
  const login = (token, fullName) => {
    setToken(token);
    setUser(fullName);
    Cookies.set("token", token, {
      expires: 29,
    });
    Cookies.set("full_name", fullName, {
      expires: 29,
    });
  };
  // logout
  const logout = () => {
    setToken();
    setUser();
    Cookies.remove("token");
    Cookies.remove("full_name");
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useApp() {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("AppContext used outside the AppProvider");
  return context;
}

export { AppProvider, useApp };
