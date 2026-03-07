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

// Ícone do usuário
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
});

// Balão do barbeiro
const createBubbleIcon = (barber) => {
  const html = `
    <div style="
      background:black;
      border-radius:15px;
      padding:5px;
      color:white;
      font-size:12px;
      width:100px;
      text-align:center;
      box-shadow:0 2px 6px rgba(0,0,0,0.6);
    ">
      <img src="${barber.photo}" 
      style="width:40px;height:40px;border-radius:50%;border:2px solid gold;" />
      <p style="margin:0;font-weight:bold">${barber.name}</p>
      <p style="margin:0;color:#D4AF37">
        ${"★".repeat(Math.floor(barber.rating))}
      </p>
    </div>
  `;

  return L.divIcon({
    html,
    className: "",
    iconSize: [100, 70],
    iconAnchor: [50, 70],
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

      return stopWatching();
    };

    load();
  }, []);

  if (loading)
    return (
      <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#000",color:"#fff"}}>
        Carregando mapa...
      </div>
    );

  if (!userPos)
    return (
      <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#000",color:"red"}}>
        Ative o GPS
      </div>
    );

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative", background:"#000" }}>

      {/* Header */}
      <div style={{
        position:"absolute",
        top:0,
        left:0,
        right:0,
        zIndex:1000,
        background:"#000",
        padding:"12px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
        <h1 style={{color:"#D4AF37",margin:0}}>BarberGo</h1>
        <span style={{color:"#fff"}}>🎧 Suporte</span>
      </div>

      {/* Banner */}
      <div style={{
        position:"absolute",
        top:"55px",
        left:0,
        right:0,
        zIndex:1000,
        background:"#D4AF37",
        padding:"10px",
        textAlign:"center",
        fontWeight:"bold"
      }}>
        🔥 8 clientes procurando barbeiro agora
      </div>

      {/* MAPA */}
      <MapContainer
        center={[userPos.lat, userPos.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%", marginTop: "100px" }}
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
            icon={createBubbleIcon(barber)}
            eventHandlers={{
              click: () => setSelectedBarber(barber),
            }}
          />
        ))}

      </MapContainer>

      {/* CARD BARBEIRO */}
      {selectedBarber && (
        <div style={{
          position:"absolute",
          bottom:"70px",
          left:0,
          right:0,
          background:"#000",
          padding:"15px",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px"
        }}>

          <div style={{display:"flex",gap:"10px"}}>

            <img
              src={selectedBarber.photo}
              style={{width:"80px",borderRadius:"10px"}}
            />

            <div>
              <h3 style={{color:"#fff",margin:0}}>
                {selectedBarber.name}
              </h3>

              <p style={{color:"#D4AF37"}}>
                {"★".repeat(Math.floor(selectedBarber.rating))}
              </p>

              <p style={{color:"#aaa"}}>
                Corte • Barba • Sobrancelha
              </p>
            </div>

          </div>

          <button
            onClick={() => window.location.href="/pagamento"}
            style={{
              width:"100%",
              marginTop:"10px",
              padding:"14px",
              borderRadius:"10px",
              border:"none",
              background:"#D4AF37",
              fontWeight:"bold"
            }}
          >
            CHAMAR BARBEIRO
          </button>

        </div>
      )}

      {/* MENU */}
      <div style={{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        background:"#000",
        display:"flex",
        justifyContent:"space-around",
        padding:"10px",
        borderTop:"1px solid #333"
      }}>
        <span style={{color:"#D4AF37"}}>🏠 Início</span>
        <span style={{color:"#fff"}}>📅 Agenda</span>
        <span style={{color:"#fff"}}>💰 Ganhos</span>
        <span style={{color:"#fff"}}>☰ Menu</span>
      </div>

    </div>
  );
};

export default Mapa;
