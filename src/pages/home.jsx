import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo ao BarberGo</h1>
      <p>Escolha sua opção abaixo:</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cadastrobarbeiro" style={{ marginLeft: '10px' }}>
          <button>Cadastro Barbeiro</button>
        </Link>
        <Link to="/mapa" style={{ marginLeft: '10px' }}>
          <button>Mapa</button>
        </Link>
      </div>
    </div>
  );
}
