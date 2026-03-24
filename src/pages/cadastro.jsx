import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { registerUser } from '../services/supabase';

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, senha);
      navigate('/login');
    } catch (err) {
      alert('Erro ao cadastrar: ' + err.message);
    }
  };

  return (
    <div className="cadastro-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0',
    }}>
      <div className="cadastro-box" style={{
        background: 'rgba(0,0,0,0.6)',
        padding: '40px',
        borderRadius: '10px',
        color: 'white',
        width: '350px',
        textAlign: 'center'
      }}>
        <h1>Cadastro Barbeiro</h1>
        <form onSubmit={handleCadastro}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
