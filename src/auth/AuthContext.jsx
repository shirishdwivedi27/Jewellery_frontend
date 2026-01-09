// import React, { createContext, useContext, useState } from "react";
// import { loginUser, registerUser, getProfile } from "../api/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     const res = await loginUser({ email, password });
//     localStorage.setItem("token", res.data.access_token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     setUser(res.data.user);
//     return res.data.user;
//   };

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

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // RESTORE SESSION ON APP LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data.user;
  };

  // REGISTER
  const register = async (username, email, password) => {
    const res = await registerUser({ user_id: username, username, email, password });

    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    }
    return res;
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
