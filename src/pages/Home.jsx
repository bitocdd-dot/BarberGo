import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../services/supabase';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function Home() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [posicaoUsuario, setPosicaoUsuario] = useState([-22.785, -43.311]); // Posição default Duque de Caxias

  useEffect(() => {
    // Pega localização real do celular (precisa de permissão)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosicaoUsuario([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => console.error("Erro na localização:", err),
        { enableHighAccuracy: true }
      );
    }

    // Carrega barbeiros do Supabase
    const carregarBarbeiros = async () => {
      const { data, error } = await supabase.from('barbers').select('*');
      if (error) {
        console.error("Erro ao carregar barbeiros:", error);
        return;
      }
      setBarbeiros(data || []);
    };
    carregarBarbeiros();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer center={posicaoUsuario} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Seu pin (usuário/cliente) */}
        <Marker position={posicaoUsuario}>
          <Popup>Você está aqui!</Popup>
        </Marker>

        {/* Pins dos barbeiros */}
        {barbeiros.map((barbeiro) => (
          <Marker
            key={barbeiro.id}
            position={[barbeiro.location?.lat || -22.785, barbeiro.location?.lng || -43.311]}
            icon={L.divIcon({
              className: 'custom-pin',
              html: `<div style="background-color: ${barbeiro.status === 'online' ? 'green' : 'orange'}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>`,
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            })}
          >
            <Popup>
              {barbeiro.nome || 'Barbeiro'}<br />
              Status: {barbeiro.status || 'desconhecido'}<br />
              <button onClick={() => alert('Abrir perfil em breve!')}>Ver Perfil</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Texto simples no topo para teste */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '8px',
        zIndex: 1000
      }}>
        BarberGo - Mapa de Barbeiros
      </div>
    </div>
  );
}
