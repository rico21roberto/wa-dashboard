import { useEffect, useState } from "react";
import "./DataPaspor.css";
//const API = "http://localhost:3000";
  const API = "http://72.60.79.201:3000";

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

    <label className="upload-btn">
      Upload Excel
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleUpload}
        hidden
      />
    </label>

      <input
        type="text"
        placeholder="Cari data..."
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