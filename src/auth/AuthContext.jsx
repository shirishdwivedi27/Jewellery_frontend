// import React, { createContext, useContext, useState } from "react";
// import { loginUser, registerUser, getProfile } from "../api/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
   
  
//   const login = async (email, password) => {
//   const res = await loginUser({ email, password });

//   const { access_token, user } = res.data;

//   localStorage.setItem("access_token", access_token);
//   localStorage.setItem("user", JSON.stringify(user));

//   setUser(user);

//   return user;
// };


//   const register = async (username, email, password) => {
//     const res = await registerUser({ user_id: username, username, email, password });
//     // store token if returned
//     if (res.data && res.data.access_token) {
//       localStorage.setItem("token", res.data.access_token);
//     }
//     // try to fetch profile or set basic user info
//     try {
//       const profile = await getProfile();
//       setUser(profile.data || { username, email });
//     } catch (err) {
//       setUser({ username, email });
//     }
//     return res;
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { loginUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ REQUIRED

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
      setLoading(false); // ✅ VERY IMPORTANT
    }
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    const { access_token, user } = res.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ✅ Prevent white screen
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
