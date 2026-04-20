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
        { name: "Ticket", value: 1 },
        { name: "Success", value: res.data.success ? 1 : 0 }
      ]);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>📊 Dashboard WA Gateway</h2>

      <LineChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#00b894" />
      </LineChart>
    </div>
  );
}

export default App;