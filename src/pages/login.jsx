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
    // Aqui depois você vai colocar a lógica de autenticação com Supabase
    console.log('Email:', email);
    console.log('Senha:', senha);
    // Navegar para Home após login (exemplo)
    navigate('/');
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.85)',
          padding: '30px',
          borderRadius: '8px',
          minWidth: '300px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login BarberGo</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          <a href="/cadastrobarbeiro">Criar conta</a>
        </p>
      </div>
    </div>
  );
}
