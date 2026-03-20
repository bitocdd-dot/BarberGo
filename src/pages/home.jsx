import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
  return (
    <div className="home-container" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Bem-vindo ao BarberGo!</h1>
      <p>Escolha uma opção:</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login">
          <button style={{ marginRight: '10px' }}>Login</button>
        </Link>
        <Link to="/cadastrobarbeiro">
          <button>Cadastro Barbeiro</button>
        </Link>
      </div>
    </div>
  );
}
