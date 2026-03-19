import React from 'react';
import '../index.css';

export default function PerfilBarbeiro() {
  // Exemplo de dados do barbeiro
  const barbeiro = {
    nome: 'Carlos Silva',
    telefone: '(21) 99999-9999',
    avaliacao: 4.9,
    servicos: ['Corte', 'Barba', 'Sobrancelha'],
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h1>Perfil do Barbeiro</h1>
      <h2>{barbeiro.nome}</h2>
      <p>Telefone: {barbeiro.telefone}</p>
      <p>Avaliação: {barbeiro.avaliacao} ⭐</p>
      <h3>Serviços:</h3>
      <ul>
        {barbeiro.servicos.map((servico, index) => (
          <li key={index}>{servico}</li>
        ))}
      </ul>
    </div>
  );
}
