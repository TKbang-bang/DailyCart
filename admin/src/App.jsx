import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Auth/Signup";
import { Toaster } from "sonner";
import axios from "axios";
import Login from "./Auth/Login";
import Display from "./Home/Display";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
axios.defaults.withCredentials = true;

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLog = async () => {
      try {
        const res = await axios.get("/protected/common/users/me");

        if (res.status != 200) throw new Error(res.data.message);

        setUser(res.data.user);
      } catch (error) {
        if (
          window.location.pathname !== "/login" ||
          window.location.pathname !== "/signup"
        )
          navigate("/login");
      }
    };

    if (window.location.pathname === "/") navigate("/products");

    getUserLog();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="*" element={<Display />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Toaster position="top-center" richColors duration={2500} />
    </UserContext.Provider>
  );
}

export default App;
