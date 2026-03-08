import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { supabase } from "../lib/supabaseClient";

const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [40,40],
  iconAnchor: [20,40],
  popupAnchor: [0,-40]
});

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);

  useEffect(() => {
    const fetchBarbeiros = async () => {
      const { data, error } = await supabase.from("barbers").select("*");
      if (error) console.log(error);
      else setBarbeiros(data);
    };
    fetchBarbeiros();
  }, []);

  return (
    <div style={{ height:"500px", width:"100%", margin:"20px 0" }}>
      <MapContainer center={[-23.55052,-46.633308]} zoom={13} style={{ height:"100%", width:"100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {barbeiros.map((b) => (
          <Marker key={b.id} position={[b.lat,b.lng]} icon={barberIcon}>
            <Popup>
              <strong>{b.nome}</strong><br />Avaliação: {b.avaliacao} ⭐
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
