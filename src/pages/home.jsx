import React, { useEffect, useState } from "react";
import "./home.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentLocation } from "../services/location";

export default function Home() {
  const [mapa, setMapa] = useState(null);
  const [posicao, setPosicao] = useState(null);

  // Ícone azul para o usuário
  const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4870/4870320.png",
    iconSize: [45, 45],
  });

  // Ícone dos barbeiros
  const barberIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png",
    iconSize: [45, 45],
  });

  // Barbeiros fake (até conectarmos no Supabase)
  const barbeirosFakes = [
    { id: 1, nome: "João Barber", lat: -22.90, lng: -43.18 },
    { id: 2, nome: "Carlos Fade", lat: -22.89, lng: -43.17 },
    { id: 3, nome: "Marcos Style", lat: -22.91, lng: -43.19 },
  ];

  useEffect(() => {
    getCurrentLocation()
      .then((local) => {
        setPosicao(local);

        const mapaLeaflet = L.map("mapa", {
          center: [local.lat, local.lng],
          zoom: 15,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(mapaLeaflet);

        setMapa(mapaLeaflet);

        // marcador do usuário
        L.marker([local.lat, local.lng], { icon: userIcon }).addTo(mapaLeaflet);
      })
      .catch((err) => console.log("Erro ao obter localização:", err));
  }, []);

  useEffect(() => {
    if (mapa && posicao) {
      barbeirosFakes.forEach((b) => {
        const marker = L.marker([b.lat, b.lng], { icon: barberIcon }).addTo(
          mapa
        );
        marker.bindPopup(`<b>${b.nome}</b><br/>⭐ 4.8`);
      });
    }
  }, [mapa, posicao]);

  return (
    <div className="home-container">
      <header className="top-bar">
        <h2>BarberGo</h2>
        <span className="status">🔥 8 clientes agora</span>
      </header>

      <div id="mapa"></div>

      <footer className="menu">
        <button>Início</button>
        <button>Agenda</button>
        <button>Ganhos</button>
        <button>Menu</button>
      </footer>
    </div>
  );
}
