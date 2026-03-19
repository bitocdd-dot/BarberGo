import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'; // Reaproveitamos o CSS do login

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    // Aqui você vai adicionar a lógica de cadastro no Supabase
    console.log({ nome, email, senha, telefone });
    alert('Cadastro realizado com sucesso!');
    navigate('/login'); // Volta para login após cadastro
  };

  return (
    <div className="login-container">
      <h1>Cadastro Barbeiro</h1>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
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
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
