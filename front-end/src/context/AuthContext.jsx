import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [motherAdmin, setMotherAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0); // State to hold real-time balance

  useEffect(() => {
    const storedUser = localStorage.getItem("motherAdmin");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setMotherAdmin(userData);
      // Fetch initial balance when user is logged in
      if (userData && userData._id) {
        fetchBalance(userData._id);
      }
    }
    setLoading(false); // Finished loading
  }, []);

  // Fetch balance in real-time
  const fetchBalance = async (adminId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admins/${adminId}`);
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Set up real-time balance update (polling every 5 seconds)
  useEffect(() => {
    let intervalId;
    if (motherAdmin && motherAdmin._id) {
      intervalId = setInterval(() => {
        fetchBalance(motherAdmin._id);
      }, 5000); // Poll every 5 seconds
    }
    return () => clearInterval(intervalId); // Cleanup on unmount or user change
  }, [motherAdmin]);

  const login = (userData) => {
    setMotherAdmin(userData);
    setBalance(0); // Reset balance on login
    localStorage.setItem("motherAdmin", JSON.stringify(userData));
    if (userData._id) {
      fetchBalance(userData._id); // Fetch balance after login
    }
  };

  const logout = () => {
    setMotherAdmin(null);
    setBalance(0); // Reset balance on logout
    localStorage.removeItem("motherAdmin");
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ motherAdmin, balance, setMotherAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};