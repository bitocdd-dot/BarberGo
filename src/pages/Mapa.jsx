import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../services/supabase.js";

// Ícone do barbeiro
const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Ícone do usuário
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35]
});

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [userLocation, setUserLocation] = useState([-22.9068, -43.1729]); // Ponto padrão: Rio de Janeiro

  useEffect(() => {
    // Carregar barbeiros do Supabase
    const carregarBarbeiros = async () => {
      const { data, error } = await supabase.from("barbers").select("*");
      if (error) {
        console.error("Erro ao buscar barbeiros:", error);
      } else {
        setBarbeiros(data || []);
      }
    };

    carregarBarbeiros();

    // Capturar localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          console.warn("Geolocalização não permitida, usando localização padrão.");
        }
      );
    }
  }, []);

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        key={userLocation.join(",")} // Atualiza o mapa quando a localização muda
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        <Marker position={userLocation} icon={userIcon}>
          <Popup>Você está aqui 📍</Popup>
        </Marker>

        {barbeiros.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]} icon={barberIcon}>
            <Popup>
              <strong>{b.nome}</strong>
              <br />
              Avaliação: {b.rating} ⭐
              <br />
              💈 Barbeiro disponível
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
