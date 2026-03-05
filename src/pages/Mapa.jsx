import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getCurrentLocation, watchLocation, stopWatching, getNearbyBarbers } from '../services/location';
import barbers from '../services/barbersData';

// Corrige ícones do Leaflet (necessário para não ficar quebrado)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

const Mapa = () => {
  const [userPos, setUserPos] = useState(null);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    // Pega localização inicial
    getCurrentLocation()
      .then(pos => {
        setUserPos(pos);
        setNearby(getNearbyBarbers(pos, barbers));
      })
      .catch(err => {
        console.error("Erro ao obter localização:", err);
        alert("Não foi possível obter sua localização. Verifique permissões.");
      });

    // Atualiza em tempo real quando o usuário se move
    watchLocation(newPos => {
      setUserPos(newPos);
      setNearby(getNearbyBarbers(newPos, barbers));
    });

    // Limpa o watcher ao sair da página
    return () => stopWatching();
  }, []);

  if (!userPos) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', textAlign: 'center' }}>
        Carregando sua localização...<br />
        <small>(Permita o acesso ao GPS quando o navegador perguntar)</small>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={[userPos.lat, userPos.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcador do usuário */}
        <Marker position={[userPos.lat, userPos.lng]}>
          <Popup>Você está aqui! (Duque de Caxias / RJ)</Popup>
        </Marker>

        {/* Marcadores dos barbeiros próximos */}
        {nearby.map(barber => (
          <Marker key={barber.id} position={[barber.lat, barber.lng]}>
            <Popup>
              <strong>{barber.name}</strong><br />
              {barber.address}<br />
              Distância: {barber.distance} km<br />
              Avaliação: {barber.rating} ★<br />
              Serviços: {barber.services.join(', ')}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
