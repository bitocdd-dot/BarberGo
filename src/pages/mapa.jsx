import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { supabase } from "../services/supabase";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);
  const [clientesOnline, setClientesOnline] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchBarbeiros();
    fetchClientes();
  }, []);

  const fetchBarbeiros = async () => {
    const { data, error } = await supabase.from("barbers").select("*");
    if (!error) setBarbeiros(data || []);
  };

  const fetchClientes = async () => {
    const { data } = await supabase.from("clients").select("*");
    setClientesOnline(data?.length || 0);
  };

  if (!isClient) return null;

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[-22.9129, -43.2003]} zoom={13} style={{ height: "90%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {barbeiros.map(b => (
          <Marker key={b.id} position={[b.lat, b.lng]}>
            <Popup>
              <h3>{b.name}</h3>
              <Link href={`/perfilbarbeiro?id=${b.id}`}>
                <button style={buttonStyle}>Ver Perfil</button>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ padding: "10px", color: "#ffd700", fontWeight: "bold", textAlign: "center" }}>
        Clientes online: {clientesOnline}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "8px 20px",
  backgroundColor: "#ffd700",
  color: "#000",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};
