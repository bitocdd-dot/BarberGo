import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../services/supabase";

const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35]
});

const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30]
});

export default function Mapa() {
  const [barbers, setBarbers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const carregarBarbeiros = async () => {
      const { data, error } = await supabase.from("barbers").select("*");
      if (error) {
        console.error("Erro ao buscar barbeiros:", error);
      } else {
        setBarbers(data);
      }
    };
    carregarBarbeiros();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error(err)
      );
    }
  }, []);

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "10px" }}>
      <MapContainer center={userLocation || [-22.9068, -43.1729]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        {userLocation && <Marker position={userLocation} icon={userIcon}><Popup>Você está aqui 📍</Popup></Marker>}
        {barbers.map((b) => (
          <Marker key={b.id} position={[Number(b.lat), Number(b.lng)]} icon={barberIcon}>
            <Popup>
              <strong>{b.name}</strong> <br />
              Avaliação: {b.rating ?? "Sem avaliações"} ⭐ <br />
              Barbeiro disponível 💈
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
