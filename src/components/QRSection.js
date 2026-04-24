import { useEffect, useState } from "react";

//const API = "http://localhost:3000";
const API = "HTTPS://wa-gateway-backend-production.up.railway.app";

export default function QRSection() {
  const [qr, setQr] = useState(null);
  const [connected, setConnected] = useState(false);

  const loadQR = async () => {
    const res = await fetch(API + "/qr");
    const data = await res.json();

    setQr(data.qr);
    setConnected(data.connected); // 🔥 FIX BUG KAMU
  };

  useEffect(() => {
    loadQR();
    const interval = setInterval(loadQR, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h4>QR Whatsapp</h4>

      {!connected && qr && (
        <>
          <p style={{ color: "yellow" }}>Silahkan scan QR</p>
          <img src={qr} width="100%" />
        </>
      )}

      {connected && (
        <p style={{ color: "lightgreen" }}>🟢 Sudah terhubung</p>
      )}

      {!connected && !qr && <p>Menunggu QR...</p>}
    </>
  );
}