import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import AdminPortal from "./AdminPanel/Sidebar/AdminPortal";







const App = () => {
  return (
    <>
     
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<AdminPortal />} />
      </Routes>
      </>
  );
};

export default App;