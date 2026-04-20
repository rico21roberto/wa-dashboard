import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.post("https://wa-gateway-backend-production.up.railway.app/api/ticket", {
      phone: "08123456789",
      message: "test dashboard"
    })
    .then(res => {
      setData([
        { name: "Total Ticket", value: 1 },
        { name: "Success", value: res.data.success ? 1 : 0 }
      ]);
    });
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1 style={{color:"#2c3e50"}}>📊 Dashboard WA Gateway
      </h1>
      <p style={{color: "green"}}>
        Status API: online
      </p>
      <div style={{
        background: "#f5f6fa",
        padding: 20,
        borderRadius: 10,
        marginTop: 20
      }}>
      <h3>Statistik</h3>
      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#00b894" />
      </LineChart>
    </div>
    </div>
  );
}

export default App;