import React from 'react';
import '../index.css';

export default function PerfilBarbeiro() {
  return (
    <div className="perfil-container" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fafafa',
      color: '#333'
    }}>
      <h1>Perfil do Barbeiro</h1>
      <p>Aqui aparecerão os detalhes do barbeiro</p>
    </div>
  );
}
