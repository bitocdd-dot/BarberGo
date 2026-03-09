import CadastroBarbeiro from "./cadastroBarbeiro";
import React, { Suspense, lazy } from "react";
import "leaflet/dist/leaflet.css";

const Mapa = lazy(() => import("./Mapa")); // carrega o mapa só quando necessário

export default function Home() {
  return (
    <div style={{ padding:"10px", textAlign:"center" }}>
      <h1>BarberGo</h1>
      <CadastroBarbeiro />

      <Suspense fallback={<p>Carregando mapa...</p>}>
        <Mapa />
      </Suspense>
    </div>
  );
}
