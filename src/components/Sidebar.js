import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

//const API = "http://localhost:3000";
const API = "HTTPS://wa-gateway-backend-production.up.railway.app";

export default function Sidebar() {
  const location = useLocation();

  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState(false);

  // ambil QR & status WA
  const loadQR = async () => {
    try {
      const res = await fetch(API + "/qr", { cache: "no-store" });
      const data = await res.json();

      setQr(data.qr);
      setStatus(data.status);
    } catch (err) {
      console.log("QR ERROR:", err);
    }
  };

  useEffect(() => {
    loadQR();
    const interval = setInterval(loadQR, 5000);
    return () => clearInterval(interval);
  }, []);

  // helper active menu
  const isActive = (path) =>
    location.pathname === path ? activeMenu : menu;

  return (
    <div style={sidebar}>
      <h2>Admin</h2>

      {/* MENU */}
      <Link to="/" style={isActive("/")}>
        🏠 Dashboard
      </Link>

      <Link to="/paspor" style={isActive("/paspor")}>
        📄 Data Paspor
      </Link>

      <Link to="/pengaduan" style={isActive("/pengaduan")}>
        📩 Pengaduan
      </Link>

      <hr style={hr} />

      {/* STATUS WA */}
      <h4>Status WhatsApp</h4>

      {status ? (
        <p style={{ color: "lightgreen" }}>🟢 Connected</p>
      ) : (
        <p style={{ color: "red" }}>🔴 Disconnected</p>
      )}

      {/* QR */}
      {!status && qr && (
        <>
          <p style={{ color: "yellow" }}>Scan QR</p>
          <img src={qr} width="100%" />
        </>
      )}

      {!status && !qr && <p>Menunggu QR...</p>}
    </div>
  );
}

/* ================= STYLE ================= */

const sidebar = {
  width: "220px",
  background: "#1e3a8a",
  color: "white",
  padding: "20px",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const menu = {
  color: "white",
  textDecoration: "none",
  padding: "10px",
  borderRadius: "5px",
};

const activeMenu = {
  ...menu,
  background: "#3b82f6",
};

const hr = {
  margin: "15px 0",
  borderColor: "#ffffff50",
};