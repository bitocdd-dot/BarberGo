import CadastroBarbeiro from "./CadastroBarbeiro.jsx";
import Mapa from "./Mapa.jsx";
import "../index.css";

export default function Home() {
  return (
    <div className="container">
      <h1>BarberGo</h1>

      {/* Formulário de cadastro */}
      <CadastroBarbeiro />

      {/* Mapa */}
      <div style={{ marginTop: "20px" }}>
        <Mapa />
      </div>
    </div>
  );
}
