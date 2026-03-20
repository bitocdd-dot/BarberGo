import React, { useState } from 'react';
import loginImage from '../assets/4F0D9D57-C2FE-4F94-B3DB-2123C22AB545.png';
import '../index.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', email, senha);
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
        padding: '20px'
      }}
    >
      <div className="login-box">
        <h1>BarberGo</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <button type="submit">ENTRAR</button>
        </form>
        <p>
          <a href="/cadastrobarbeiro">Criar conta</a>
        </p>
      </div>
    </div>
  );
}
