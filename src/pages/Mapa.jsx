import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../services/supabase";
import "../pages/mapa.css"; // arquivo de estilo

// Ícone do barbeiro
const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [45, 45],
  iconAnchor: [22, 45],
  popupAnchor: [0, -40]
});

// Ícone do usuário
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35]
});

export default function Mapa() {
  const [barbers, setBarbers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      const { data, error } = await supabase.from("barbers").select("*");
      if (!error) setBarbers(data);
    };
    carregar();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={userLocation || [-22.9068, -43.1729]}
        zoom={13}
        className="mapa"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* Marcador do usuário */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup className="popup-user">Você está aqui 📍</Popup>
          </Marker>
        )}

        {/* Lista de barbeiros */}
        {barbers.map((b) => (
          <Marker key={b.id} position={[Number(b.lat), Number(b.lng)]} icon={barberIcon}>
            <Popup className="popup-card">
              <div className="card">
                <h3>{b.name}</h3>
                <p>📞 {b.phone}</p>
                <p>⭐ {b.rating ?? "Sem avaliação"}</p>
                <button className="btn">Ver Perfil</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
