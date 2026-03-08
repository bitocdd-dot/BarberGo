import CadastroBarbeiro from "./cadastroBarbeiro"; // deve estar na mesma pasta
import Mapa from "./Mapa"; // deve estar na mesma pasta
import "../node_modules/leaflet/dist/leaflet.css"; // garante que o mapa funciona

export default function Home() {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h1>BarberGo</h1>
      <CadastroBarbeiro />
      <Mapa />
    </div>
  );
}
