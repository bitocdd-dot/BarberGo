import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    console.log('Nome:', nome, 'Email:', email, 'Senha:', senha);
    navigate('/login'); // depois conectar com Supabase
  };

  return (
    <div className="cadastro-container" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Cadastro Barbeiro</h1>
      <form onSubmit={handleCadastro}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
