import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../index.css';

export default function Mapa() {
  const mapaRef = useRef(null);

  useEffect(() => {
    if (mapaRef.current) {
      const map = L.map(mapaRef.current).setView([-22.912, -43.230], 13); // Coordenadas do Rio de Janeiro como exemplo

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Exemplo de marcador
      L.marker([-22.912, -43.230]).addTo(map)
        .bindPopup('Exemplo de Barbeiro')
        .openPopup();
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Mapa dos Barbeiros</h1>
      <div
        ref={mapaRef}
        style={{ height: '500px', width: '100%', marginTop: '20px' }}
      ></div>
    </div>
  );
}
