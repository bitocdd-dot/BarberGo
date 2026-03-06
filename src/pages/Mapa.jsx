import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  getCurrentLocation,
  watchLocation,
  stopWatching,
  getNearbyBarbers,
} from "../services/location";
import barbers from "../services/barbersData";

// Ícones customizados (estilo Uber)
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const availableIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const occupiedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente pra botão de recentralizar
const RecenterButton = ({ position }) => {
  const map = useMap();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) {
      const btn = L.DomUtil.create("button", "recenter-btn");
      btn.innerHTML = "📍";
      btn.style.position = "absolute";
      btn.style.bottom = "80px";
      btn.style.right = "20px";
      btn.style.zIndex = "1000";
      btn.style.background = "#fff";
      btn.style.border = "2px solid #ccc";
      btn.style.borderRadius = "50%";
      btn.style.width = "40px";
      btn.style.height = "40px";
      btn.style.cursor = "pointer";
      btn.style.fontSize = "20px";
      btn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
      map.getContainer().appendChild(btn);
      buttonRef.current = btn;

      btn.addEventListener("click", () => {
        map.setView(position, 15);
      });
    }
  }, [map, position]);

  return null;
};

const Mapa = () => {
  const [userPos, setUserPos] = useState(null);
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const pos = await getCurrentLocation();
        setUserPos(pos);
        setNearby(getNearbyBarbers(pos, barbers));
        setLoading(false);
      } catch (err) {
        setError("Não conseguimos acessar sua localização. Ative o GPS e permita no navegador.");
        setLoading(false);
      }

      const unsubscribe = watchLocation((newPos) => {
        setUserPos(newPos);
        setNearby(getNearbyBarbers(newPos, barbers));
      });

      return () => {
        unsubscribe();
        stopWatching();
      };
    };

    init();
  }, []);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#fff",
        fontSize: "24px",
      }}>
        <div>Localizando você...</div>
        <div style={{ fontSize: "16px", marginTop: "10px", opacity: 0.7 }}>
          Ative o GPS e permita localização
        </div>
      </div>
    );
  }

  if (error || !userPos) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111",
        color: "#ff6b6b",
        fontSize: "20px",
        textAlign: "center",
        padding: "20px",
      }}>
        {error || "Erro ao carregar o mapa. Tente novamente."}
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[userPos.lat, userPos.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Botão recentralizar */}
        <RecenterButton position={[userPos.lat, userPos.lng]} />

        {/* Usuário */}
        <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
          <Popup>📍 Você está aqui</Popup>
        </Marker>

        <Circle
          center={[userPos.lat, userPos.lng]}
          radius={500} // aumentei pra ver melhor
          pathOptions={{ color: "#1E90FF", fillColor: "#1E90FF", fillOpacity: 0.15 }}
        />

        {/* Barbeiros */}
        {nearby.map((barber) => (
          <Marker
            key={barber.id}
            position={[barber.lat, barber.lng]}
            icon={barber.available ? availableIcon : occupiedIcon}
          >
            <Popup>
              <div style={{ textAlign: "center", minWidth: "220px", padding: "10px" }}>
                <h3 style={{ margin: "0 0 8px", color: "#D4AF37" }}>{barber.name}</h3>
                <div style={{ marginBottom: "8px" }}>
                  {"⭐".repeat(Math.floor(barber.rating))} {barber.rating.toFixed(1)}
                </div>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  {barber.services.join(" • ")}
                </p>
                <p style={{ margin: "4px 0", color: "#aaa" }}>
                  {barber.distance.toFixed(1)} km de você
                </p>
                <p style={{
                  color: barber.available ? "#00ff00" : "#ff4444",
                  fontWeight: "bold",
                  margin: "8px 0",
                }}>
                  {barber.available ? "🟢 Disponível agora" : "🔴 Ocupado"}
                </p>

                <button
                  onClick={() => window.location.href = `/perfil?barberId=${barber.id}`}
                  style={{
                    background: "#D4AF37",
                    color: "#000",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                    fontSize: "16px",
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
