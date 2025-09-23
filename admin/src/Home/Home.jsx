import React from "react";
import "./home.css";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";
import CreateProducts from "./Views/CreateProducts";

function Home() {
  return (
    <main className="home">
      <Nav />

      <Routes>
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/createproduct" element={<CreateProducts />} />
      </Routes>
    </main>
  );
}

export default Home;
