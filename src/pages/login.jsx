import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="login-container">
      <h1>Login BarberGo</h1>
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
    </div>
  );
}
