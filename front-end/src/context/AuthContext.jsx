import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [motherAdmin, setMotherAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  // --- ✅ Balance Fetch Function
  const fetchBalance = async (adminId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admins/${adminId}`
      );
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // --- ✅ Reload Function
  const reload = async () => {
    if (motherAdmin && motherAdmin._id) {
      await fetchBalance(motherAdmin._id);
      
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("motherAdmin");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setMotherAdmin(userData);
      if (userData && userData._id) {
        fetchBalance(userData._id);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let intervalId;
    if (motherAdmin && motherAdmin._id) {
      intervalId = setInterval(() => {
        fetchBalance(motherAdmin._id);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [motherAdmin]);

  const login = (userData) => {
    setMotherAdmin(userData);
    setBalance(0);
    localStorage.setItem("motherAdmin", JSON.stringify(userData));
    if (userData._id) {
      fetchBalance(userData._id);
    }
  };

  const logout = () => {
    setMotherAdmin(null);
    setBalance(0);
    localStorage.removeItem("motherAdmin");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ motherAdmin, balance, setMotherAdmin, login, logout, reload }}
    >
      {children}
    </AuthContext.Provider>
  );
};
