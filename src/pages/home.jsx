import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
  return (
    <div
      className="home-container"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #ff8c00, #ff4500)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1>Bem-vindo ao BarberGo</h1>
      <p>Escolha uma opção:</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>
        <Link to="/cadastrobarbeiro">
          <button className="home-btn">Cadastro Barbeiro</button>
        </Link>
      </div>
    </div>
  );
}
