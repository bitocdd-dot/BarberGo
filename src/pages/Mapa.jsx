import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../services/supabase.js";

const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);

  useEffect(() => {
    const carregarBarbeiros = async () => {
      const { data, error } = await supabase
        .from("barbers")
        .select("*");

      if (error) {
        console.log("Erro ao buscar barbeiros:", error);
      } else {
        setBarbeiros(data || []);
      }
    };

    carregarBarbeiros();
  }, []);

  return (
    <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
      <MapContainer center={[-22.9068, -43.1729]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {barbeiros.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]} icon={barberIcon}>
            <Popup>
              <strong>{b.nome}</strong>
              <br />
              Avaliação: {b.rating} ⭐
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
