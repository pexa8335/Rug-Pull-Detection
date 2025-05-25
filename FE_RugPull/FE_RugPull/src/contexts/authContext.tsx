import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string;
  role: string; 
  login: (token: string, username: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [role,setRole]  = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const name = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");
    if (token && name && savedRole) {
      setIsLoggedIn(true);
      setUsername(name);
      setRole(savedRole);
    }
  }, []);

  const login = (token: string, username: string, role : string) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role",role)
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUsername("");
    setRole("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
