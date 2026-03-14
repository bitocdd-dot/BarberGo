import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { supabase } from "../services/supabase";
import "./mapa.css";

const barberIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3081/3081682.png",
  iconSize: [40, 40]
});

export default function Mapa() {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.from("barbers").select("*");
      setBarbers(data);
    }

    carregar();
  }, []);

  return (
    <div className="map-container">
      <MapContainer
        center={[-22.9068, -43.1729]}
        zoom={13}
        className="mapa"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {barbers.map((b) => (
          <Marker
            key={b.id}
            position={[Number(b.lat), Number(b.lng)]}
            icon={barberIcon}
          >
            <Popup>
              <strong>{b.name}</strong>
              <br />
              📞 {b.phone}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
