import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Home() {
  return (
    <div className="home-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    }}>
      <h1>Bem-vindo ao BarberGo</h1>
      <p>Escolha uma opção:</p>
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <Link to="/login"><button className="home-btn">Login</button></Link>
        <Link to="/cadastrobarbeiro"><button className="home-btn">Cadastro Barbeiro</button></Link>
      </div>
    </div>
  );
}
