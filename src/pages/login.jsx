import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../assets/001D0B34-3A01-4617-BD33-9E1F46673EA4.png';
import '../index.css';
import { loginUser } from '../services/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, senha);
      console.log('Login sucesso:', data);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login: ' + err.message);
    }
  };

  return (
    <div className="login-container" style={{
      backgroundImage: `url(${loginImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div className="login-box">
        <h1>BarberGo</h1>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <button type="submit">ENTRAR</button>
        </form>
        <p><a href="/cadastrobarbeiro">Criar conta</a></p>
      </div>
    </div>
  );
}
