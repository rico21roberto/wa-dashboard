import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import DataPaspor from "./pages/DataPaspor";
import Pengaduan from "./pages/Pengaduan";
import Login from "./pages/login";
import Sidebar from "./components/Sidebar";

function App() {
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("admin")
  );

  // 🔐 BELUM LOGIN
  if (!isLogin) {
    return <Login onLogin={() => setIsLogin(true)} />;
  }

  // ✅ SUDAH LOGIN
  return (
    <BrowserRouter>
      <div style={{ display: "flex", fontFamily: "Arial" }}>
        
        {/* SIDEBAR (GLOBAL) */}
        <Sidebar />

        {/* CONTENT */}
        <div style={{ flex: 1, padding: "20px" }}>
          
          {/* HEADER GLOBAL */}
          <div style={header}>
            <h2>KANTOR IMIGRASI BELAWAN</h2>

            <button
              onClick={() => {
                localStorage.removeItem("admin");
                window.location.reload();
              }}
              style={logoutBtn}
            >
              Logout
            </button>
          </div>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/paspor" element={<DataPaspor />} />
            <Route path="/pengaduan" element={<Pengaduan />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

/* ================= STYLE ================= */

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const logoutBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};