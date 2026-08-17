import React, { createContext, useState, useEffect, useContext } from "react";
import { signupAPI, loginAPI, logoutAPI, getMeAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app startup
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getMeAPI();
          setUser(userData);
        } catch (error) {
          console.error("Session restore failed:", error);
          // Token might be expired or invalid, remove it
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Sign up action
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await signupAPI(name, email, password);
      localStorage.setItem("token", data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email
      });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Login action
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginAPI(email, password);
      localStorage.setItem("token", data.token);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email
      });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Logout action
  const logout = async () => {
    try {
      await logoutAPI();
    } catch (error) {
      console.error("Backend logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
