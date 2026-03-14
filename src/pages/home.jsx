import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>💈 BarberGo</h1>

      <p>Encontre barbeiros próximos de você</p>

      <div style={{ marginTop: 30 }}>
        <Link to="/cadastrobarbeiro">
          <button style={{ padding: 15, margin: 10 }}>
            Cadastrar Barbeiro
          </button>
        </Link>

        <Link to="/mapa">
          <button style={{ padding: 15, margin: 10 }}>
            Ver Mapa
          </button>
        </Link>
      </div>
    </div>
  );
}
