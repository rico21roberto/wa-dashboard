import { useState } from "react";

//const API = "http://localhost:3000";
const API = "http://72.60.79.201:3000";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (res.status !== 200) {
      alert("Login gagal ❌");
      return;
    }

    const data = await res.json();

    localStorage.setItem("admin", JSON.stringify(data.user));
    onLogin();
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Login Admin</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}