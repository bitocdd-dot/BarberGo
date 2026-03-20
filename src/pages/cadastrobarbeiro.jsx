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
      const data = await registerUser(email, senha);
      console.log('Cadastro sucesso:', data);
      navigate('/login');
    } catch (err) {
      alert('Erro ao cadastrar: ' + err.message);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
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
