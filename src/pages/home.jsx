import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./home.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import BarberCard from "../components/barberCard";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  // Ícone do barbeiro no mapa
  const barberIcon = new L.Icon({
    iconUrl:
      "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    carregarBarbeiros();
  }, []);

  async function carregarBarbeiros() {
    const { data, error } = await supabase.from("barbers").select("*");

    if (error) {
      console.log("Erro ao carregar barbeiros:", error);
      return;
    }

    // Filtra barbeiros que têm coordenadas
    const filtrados = data.filter((b) => b.lat && b.lng);
    setBarbers(filtrados);
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[-22.875113, -43.561108]} // Centro inicial
        zoom={13}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {barbers.map((barber) => (
          <Marker
            key={barber.id}
            position={[barber.lat, barber.lng]}
            icon={barberIcon}
          >
            <Popup closeButton={false}>
              <BarberCard
                id={barber.id}
                name={barber.name}
                profile_image={barber.profile_image}
                rating={barber.rating}
                onClick={() => navigate(`/perfilBarbeiro?id=${barber.id}`)}
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
