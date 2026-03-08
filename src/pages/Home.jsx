import CadastroBarbeiro from "./cadastroBarbeiro";
import Mapa from "./Mapa";
import "leaflet/dist/leaflet.css";

export default function Home() {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h1>BarberGo</h1>
      <CadastroBarbeiro />
      <Mapa />
    </div>
  );
}
