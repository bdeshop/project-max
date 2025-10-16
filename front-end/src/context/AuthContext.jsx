import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [motherAdmin, setMotherAdmin] = useState(null);
const [loading, setLoading] = useState(true)

 useEffect(() => {
  const storedUser = localStorage.getItem("motherAdmin");
  if (storedUser) setMotherAdmin(JSON.parse(storedUser));
  setLoading(false); // Finished loading
}, []);

const login = (userData) => {
  setMotherAdmin(userData);
  localStorage.setItem("motherAdmin", JSON.stringify(userData));
};

const logout = () => {
  setMotherAdmin(null);
  localStorage.removeItem("motherAdmin");
};

if (loading) return null;

return (
    <AuthContext.Provider value={{ motherAdmin, setMotherAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

}