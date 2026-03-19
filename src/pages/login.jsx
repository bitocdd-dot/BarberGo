import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/001D0B34-3A01-4617-BD33-9E1F46673EA4.png';
import '../login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', senha);
    navigate('/'); // Aqui depois você conecta com Supabase
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div className="login-box">
        <h1>BarberGo</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">ENTRAR</button>
        </form>
        <p>
          <a href="/cadastrobarbeiro">Criar conta</a>
        </p>
      </div>
    </div>
  );
}
