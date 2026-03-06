import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  getCurrentLocation,
  watchLocation,
  stopWatching,
} from "../services/location";
import barbers from "../services/barbersData";

// Fix ícones
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Ícones custom
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const availableIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const occupiedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const RecenterControl = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    const controlDiv = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    controlDiv.style.background = 'white';
    controlDiv.style.border = '2px solid rgba(0,0,0,0.2)';
    controlDiv.style.borderRadius = '4px';
    controlDiv.style.cursor = 'pointer';
    controlDiv.style.padding = '5px';
    controlDiv.innerHTML = '📍';
    controlDiv.title = 'Minha localização';
    controlDiv.onclick = () => map.setView(position, 13);
    map.getContainer().appendChild(controlDiv);
    return () => map.getContainer().removeChild(controlDiv);
  }, [map, position]);
  return null;
};

const Mapa = () => {
  const [userPos, setUserPos] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeWatch;

    const load = async () => {
      try {
        const pos = await getCurrentLocation();
        setUserPos(pos);

        const updatedBarbers = barbers.map(b => ({
          ...b,
          available: b.id % 2 === 1,
          distance: getDistance(pos.lat, pos.lng, b.lat, b.lng),
        }));
        setNearby(updatedBarbers);
      } catch (err) {
        console.error("Erro localização:", err);
      } finally {
        setLoading(false);
      }

      unsubscribeWatch = watchLocation((newPos) => {
        setUserPos(newPos);
        const updated = barbers.map(b => ({
          ...b,
          available: b.id % 2 === 1,
          distance: getDistance(newPos.lat, newPos.lng, b.lat, b.lng),
        }));
        setNearby(updated);
      });
    };

    load();

    return () => {
      if (unsubscribeWatch) unsubscribeWatch();
      stopWatching();
    };
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff'}}>Carregando mapa...</div>;

  if (!userPos) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: 'red'}}>Erro na localização. Ative GPS.</div>;

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer
        center={[userPos.lat, userPos.lng]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />

        <RecenterControl position={[userPos.lat, userPos.lng]} />

        <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
          <Popup>Você está aqui</Popup>
        </Marker>

        <Circle center={[userPos.lat, userPos.lng]} radius={5000} color="#3388ff" fillColor="#3388ff" fillOpacity={0.1} />

        {nearby.map(barber => (
          <Marker
            key={barber.id}
            position={[barber.lat, barber.lng]}
            icon={barber.available ? availableIcon : occupiedIcon}
          >
            <Popup closeButton={true} autoPan={true} autoPanPadding={[50, 50]}>
              <div style={{ minWidth: '220px', textAlign: 'center', padding: '10px' }}>
                <h3 style={{ margin: '0 0 8px', color: '#D4AF37' }}>{barber.name}</h3>
                <p style={{ margin: '5px 0' }}>⭐ {barber.rating}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>{barber.services.join(' • ')}</p>
                <p style={{ margin: '5px 0', color: '#aaa' }}>{barber.distance} km</p>
                <p style={{ color: barber.available ? 'lime' : 'red', fontWeight: 'bold' }}>
                  {barber.available ? '🟢 Disponível' : '🔴 Ocupado'}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log("Botão Ver Perfil clicado para barbeiro ID:", barber.id); // pra debug
                    setTimeout(() => {
                      window.location.href = `/perfil?barberId=${barber.id}`;
                    }, 100); // delay pequeno pra evento propagar
                  }}
                  style={{
                    background: '#D4AF37',
                    color: 'black',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginTop: '10px',
                    width: '100%',
                    fontSize: '16px',
                  }}
                >
                  Ver Perfil
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Mapa;
