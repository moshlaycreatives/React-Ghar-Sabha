import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import AdminPortal from "./AdminPanel/Sidebar/AdminPortal";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";







const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminPortal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;