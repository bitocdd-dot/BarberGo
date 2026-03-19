import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './src/index.css';
import './src/login.css';

// Importar todas as telas
import Home from './src/pages/home.jsx';
import Login from './src/pages/login.jsx';
import CadastroBarbeiro from './src/pages/cadastrobarbeiro.jsx';
import Mapa from './src/pages/mapa.jsx';
import PerfilBarbeiro from './src/pages/perfilbarbeiro.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrobarbeiro" element={<CadastroBarbeiro />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/perfilbarbeiro" element={<PerfilBarbeiro />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
