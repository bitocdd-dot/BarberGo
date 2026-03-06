import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  getCurrentLocation,
  watchLocation,
  stopWatching,
  getNearbyBarbers,
} from "../services/location";
import barbers from "../services/barbersData";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const Mapa = () => {
  const [userPos, setUserPos] = useState(null);
  const [nearby, setNearby] = useState([]);

  useEffect(() => {
    getCurrentLocation()
      .then((pos) => {
        setUserPos(pos);
        setNearby(getNearbyBarbers(pos, barbers));
      })
      .catch(() => {
        alert("Ative o GPS para usar o BarberGo");
      });

    watchLocation((newPos) => {
      setUserPos(newPos);
      setNearby(getNearbyBarbers(newPos, barbers));
    });

    return () => stopWatching();
  }, []);

  if (!userPos) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        Localizando você...
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[userPos.lat, userPos.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Usuário */}

        <Marker position={[userPos.lat, userPos.lng]}>
          <Popup>
            <b>📍 Você está aqui</b>
          </Popup>
        </Marker>

        <Circle
          center={[userPos.lat, userPos.lng]}
          radius={300}
          pathOptions={{ color: "#136AEC", fillColor: "#136AEC", fillOpacity: 0.1 }}
        />

        {/* Barbeiros */}

        {nearby.map((barber) => (
          <Marker key={barber.id} position={[barber.lat, barber.lng]}>
            <Popup>
              <div style={{ textAlign: "center", width: "200px" }}>
                <h3>{barber.name}</h3>

                <p>⭐ {barber.rating}</p>

                <p>{barber.services.join(", ")}</p>

                <p>{barber.distance} km de você</p>

                <p
                  style={{
                    color: barber.available ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {barber.available ? "Disponível agora" : "Ocupado"}
                </p>

                <button
                  style={{
                    background: "#D4AF37",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    window.location.href = "/perfil";
                  }}
                >
                  Ver perfil
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
