import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>BarberGo</h1>
      <p>Bem-vindo! Escolha uma opção:</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/CadastroBarbeiro">
          <button style={{ marginRight: "10px", padding: "10px 20px" }}>
            Cadastrar Barbeiro
          </button>
        </Link>

        <Link to="/Mapa">
          <button style={{ padding: "10px 20px" }}>Ver Mapa</button>
        </Link>
      </div>
    </div>
  );
}
