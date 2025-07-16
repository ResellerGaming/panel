import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ email: '', username: '', server_name: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Membuat akun dan server...');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const result = await res.text();
    setStatus(result);
  };

  return (
    <main className="container">
      <h1>🛠️ Daftar Layanan Hosting Bot</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="server_name" placeholder="Nama Server Bot" onChange={handleChange} required />
        <button type="submit">Buat Akun + Server</button>
      </form>
      <p>{status}</p>
      <style jsx>{\`
        .container {
          max-width: 400px;
          margin: auto;
          padding: 40px;
          font-family: sans-serif;
          color: #fff;
          background: #0f1c2e;
          border-radius: 10px;
          margin-top: 50px;
          box-shadow: 0 0 20px #00fff7;
        }
        input, button {
          margin-top: 10px;
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
        }
        input {
          background: #222;
          color: white;
        }
        button {
          background-color: #00fff7;
          color: black;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}
