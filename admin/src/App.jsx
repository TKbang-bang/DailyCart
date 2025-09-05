import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./Auth/Signup";
import Home from "./Home/Home";
import { Toaster } from "sonner";
import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
axios.defaults.withCredentials = true;

function App() {
  const [yes, setYes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserLog = async () => {
      if (yes) return;

      navigate("/signup");
    };

    getUserLog();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Toaster position="top-center" richColors duration={2500} />
    </>
  );
}

export default App;
