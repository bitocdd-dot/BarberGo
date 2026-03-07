import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  getCurrentLocation,
  watchLocation,
  stopWatching,
} from "../services/location";

import barbers from "../services/barbersData";

const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
});

const barberIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
  iconSize: [35, 35],
});

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
        console.log(err);
      } finally {
        setLoading(false);
      }

      watchLocation((newPos) => {
        setUserPos(newPos);
      });
    };

    load();

    return () => {
      stopWatching();
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
        }}
      >
        Carregando mapa...
      </div>
    );
  }

  if (!userPos) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "red",
        }}
      >
        Ative o GPS
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>

      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "#000",
          padding: "12px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ color: "#D4AF37", margin: 0 }}>BarberGo</h1>
        <span style={{ color: "#fff" }}>Suporte</span>
      </div>

      {/* BANNER */}
      <div
        style={{
          position: "absolute",
          top: "55px",
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "#D4AF37",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        8 clientes procurando barbeiro agora
      </div>

      {/* MAPA */}
      <MapContainer
        center={[userPos.lat, userPos.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[userPos.lat, userPos.lng]} icon={userIcon} />

        <Circle
          center={[userPos.lat, userPos.lng]}
          radius={500}
          color="#136AEC"
          fillOpacity={0.2}
        />

        {barbers.map((barber) => (
          <Marker
            key={barber.id}
            position={[barber.lat, barber.lng]}
            icon={barberIcon}
            eventHandlers={{
              click: () => {
                setSelectedBarber(barber);
              },
            }}
          >
            <Popup>
              <b>{barber.name}</b>
              <br />
              ⭐ {barber.rating}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* CARD DO BARBEIRO */}
      {selectedBarber && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: 0,
            right: 0,
            background: "#000",
            padding: "15px",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <h3 style={{ color: "#fff" }}>{selectedBarber.name}</h3>

          <p style={{ color: "#D4AF37" }}>
            {"⭐".repeat(Math.floor(selectedBarber.rating))}
          </p>

          <button
            onClick={() => (window.location.href = "/pagamento")}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "#D4AF37",
              fontWeight: "bold",
            }}
          >
            CHAMAR BARBEIRO
          </button>
        </div>
      )}

      {/* MENU */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#000",
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
          borderTop: "1px solid #333",
        }}
      >
        <span style={{ color: "#D4AF37" }}>🏠 Início</span>
        <span style={{ color: "#fff" }}>📅 Agenda</span>
        <span style={{ color: "#fff" }}>💰 Ganhos</span>
        <span style={{ color: "#fff" }}>☰ Menu</span>
      </div>
    </div>
  );
};

export default Mapa;
