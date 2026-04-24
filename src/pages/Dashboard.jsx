import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

//const API = "http://localhost:3000";
  const API = "HTTPS://wa-gateway-backend-production.up.railway.app";

  export default function Dashboard() {
  const [qr, setQr] = useState(null);
  const [status, setStatus] = useState(false);
  const [pengaduan, setPengaduan] = useState([]);
  const [totalPengaduan, setTotalPengaduan] = useState(0);
  const [totalPaspor, setTotalPaspor] = useState(0);

  // ================= QR =================
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

  // ================= DATA =================
  const loadData = async () => {
    try {
      // pengaduan
      const res1 = await fetch(API + "/grafik-pengaduan");
      const data1 = await res1.json();

      const safeData = Array.isArray(data1) ? data1 : [];
      setPengaduan(safeData);

      const total = safeData.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      );
      setTotalPengaduan(total);

      // paspor
      const res2 = await fetch(API + "/grafik-paspor");
      const data2 = await res2.json();

      setTotalPaspor(data2?.[0]?.total ?? 0);
    } catch (err) {
      console.log("DATA ERROR:", err);

      // fallback biar tetap tampil
      setPengaduan([]);
      setTotalPengaduan(0);
      setTotalPaspor(0);
    }
  };

  useEffect(() => {
    loadQR();
    loadData();

    const interval = setInterval(loadQR, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", width: "100%" }}>
      <h1>Dashboard Admin</h1>

      {/* ================= CARD ================= */}
      <div style={cardContainer}>
        <div style={cardBlue}>
          <h3>Total Paspor Siap</h3>
          <h2>{totalPaspor ?? 0}</h2>
        </div>

        <div style={cardOrange}>
          <h3>Total Pengaduan</h3>
          <h2>{totalPengaduan ?? 0}</h2>
        </div>

        <div style={cardGreen}>
          <h3>Status WhatsApp</h3>
          <h2>{status ? "Connected" : "Disconnected"}</h2>
        </div>
      </div>

      {/* ================= GRAFIK ================= */}
      <div style={{ marginTop: "40px" }}>
        <h3>Grafik Pengaduan Harian</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={pengaduan || []}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "20px",
};

const cardBlue = {
  background: "#3b82f6",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
};

const cardOrange = {
  background: "#f59e0b",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
};

const cardGreen = {
  background: "#10b981",
  color: "white",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
};