import React from "react";
import Nav from "./Components/Nav";
import api from "../Services/api.service";

function Home() {
  const handleTokens = async () => {
    try {
      const res = await api.get("/common/users/me");

      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="home">
      <Nav />
      <h1>Home</h1>
      <button onClick={handleTokens}>Get tokens</button>
    </main>
  );
}

export default Home;
