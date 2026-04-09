import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import AdminPortal from "./AdminPanel/Sidebar/AdminPortal";
import TermsAndConditions from "./AdminPanel/Pages/Legal/TermsAndConditions";
import PrivacyPolicy from "./AdminPanel/Pages/Legal/PrivacyPolicy";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";







const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          className: "ghar-sabha-toast",
          style: {
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: "14px",
          },
          success: {
            duration: 3500,
            style: {
              background: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #A7F3D0",
            },
          },
          error: {
            duration: 6500,
            style: {
              background: "#FEF2F2",
              color: "#991B1B",
              border: "1px solid #FECACA",
              maxWidth: "min(420px, 92vw)",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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