import { useEffect, useState } from "react";

//const API = "http://localhost:3000";
  const API = "HTTPS://wa-gateway-backend-production.up.railway.app";

export default function DataPaspor() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async (keyword = "") => {
    const res = await fetch(API + "/paspor?search=" + keyword);
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch(API + "/upload-excel", {
      method: "POST",
      body: formData,
    });

    alert("Upload berhasil");
    loadData();
  };

  return (
    <div>
      <h1>Data Paspor</h1>

      <input type="file" onChange={handleUpload} />

      <input
        type="text"
        placeholder="Cari..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          loadData(e.target.value);
        }}
      />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>No Permohonan</th>
            <th>No Paspor</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.no_permohonan}</td>
              <td>{item.no_paspor}</td>
              <td>{item.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}