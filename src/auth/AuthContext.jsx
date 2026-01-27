import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { loginUser, registerUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ RESTORE SESSION ON PAGE REFRESH
  useEffect(() => {
    try {
      const token = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Session restore failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // // ✅ LOGIN
  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    const { access_token, user } = res.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    return user;
  };
  const loginset = (user, access_token) => {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  // ✅ REGISTER (SAME AS LOGIN)
const register = async (username, email, password, phone) => {
  const res = await registerUser({
    user_id: username,   // keep this as you want
    username,
    email,
    password,
    phone,
  });

  const { access_token, user } = res.data;

  localStorage.setItem("access_token", access_token);
  localStorage.setItem("user", JSON.stringify(user));

  setUser(user);
  return user;
};

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Prevent white screen
  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ user, login, loginset, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
