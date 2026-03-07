import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
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

// Função pra criar balão custom com foto e nome
const createBubbleIcon = (barber) => {
  const html = `
    <div style="text-align: center; background: black; border-radius: 20px; padding: 5px; color: white; font-size: 12px; width: 100px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">
      <img src="${barber.photo || 'https://via.placeholder.com/50'}" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid gold;" />
      <p style="margin: 0; font-weight: bold;">${barber.name}</p>
      <p style="margin: 0; font-size: 10px;">⭐ ${barber.rating}</p>
    </div>
  `;

  return L.divIcon({
    className: "custom-bubble",
    html,
    iconSize: [100, 70],
    iconAnchor: [50, 70],
    popupAnchor: [0, -70],
  });
};

const Mapa = () => {
  const [userPos, setUserPos] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const pos = await getCurrentLocation();
        setUserPos(pos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      watchLocation((newPos) => {
        setUserPos(newPos);
      });
    };

    load();

    return () => stopWatching();
  }, []);

  if (loading) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#000'}}>Carregando mapa BarberGo...</div>;

  if (!userPos) return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red', background: '#000'}}>Ative GPS.</div>;

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative", background: "#000" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000, background: "#000", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#D4AF37", fontSize: "24px", margin: 0 }}>BarberGo</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="https://via.placeholder.com/30" alt="user" style={{ borderRadius: "50%", marginRight: "10px" }} />
          <span style={{ fontSize: "24px" }}>🎧 Suporte</span>
        </div>
      </div>

      <div style={{ position: "absolute", top: "50px", left: 0, right: 0, zIndex: 1000, background: "#D4AF37", color: "#000", padding: "10px", textAlign: "center", fontWeight: "bold" }}>
        🔥 8 clientes em busca de barbeiro agora →
      </div>

      <MapContainer center={[userPos.lat, userPos.lng]} zoom={14} style={{ height: "calc(100% - 150px)", width: "100%", marginTop: "90px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
          <Popup>Você está aqui</Popup>
        </Marker>

        <Circle center={[userPos.lat, userPos.lng]} radius={500} color="#136AEC" fillColor="#136AEC" fillOpacity={0.2} />

        {barbers.map(barber => (
          <Marker
            key={barber.id}
            position={[barber.lat, barber.lng]}
            icon={createBubbleIcon(barber)}
            eventHandlers={{
              click: () => setSelectedBarber(barber),
            }}
          />
        ))}
      </MapContainer>

      {selectedBarber && (
        <div style={{ position: "absolute", bottom: "60px", left: 0, right: 0, background: "#000", padding: "15px", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", boxShadow: "0 -2px 10px rgba(0,0,0,0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img src={selectedBarber.photo || "https://via.placeholder.com/80"} alt={selectedBarber.name} style={{ width: "80px", height: "100px", borderRadius: "12px", objectFit: "cover" }} />
            <div>
              <h3 style={{ color: "#D4AF37", margin: 0 }}>{selectedBarber.name}</h3>
              <p style={{ color: "#fff", margin: "5px 0" }}>⭐⭐⭐⭐⭐ {selectedBarber.rating}</p>
              <p style={{ color: "#aaa", margin: 0 }}>Corte • Barba • Sobrancelha</p>
            </div>
          </div>
          <button onClick={() => window.location.href = "/pagamento"} style={{ width: "100%", background: "#D4AF37", color: "#000", border: "none", padding: "15px", borderRadius: "12px", fontWeight: "bold", marginTop: "15px" }}>
            CHAMAR BARBEIRO
          </button>
        </div>
      )}

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#000", display: "flex", justifyContent: "space-around", padding: "10px 0", borderTop: "1px solid #333" }}>
        <div style={{ textAlign: "center", color: "#D4AF37" }}>🏠 Início</div>
        <div style={{ textAlign: "center", color: "#fff" }}>📅 Agenda</div>
        <div style={{ textAlign: "center", color: "#fff" }}>💰 Ganhos</div>
        <div style={{ textAlign: "center", color: "#fff" }}>☰ Menu</div>
      </div>
    </div>
  );
};

export default Mapa;
