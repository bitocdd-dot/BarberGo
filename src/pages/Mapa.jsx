import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import barbers from "../services/barbersData";

function Mapa() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation([
        position.coords.latitude,
        position.coords.longitude
      ]);
    });
  }, []);

  if (!userLocation) {
    return <h2>Carregando mapa...</h2>;
  }

  return (
    <MapContainer
      center={userLocation}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Localização do cliente */}
      <Marker position={userLocation}>
        <Popup>Você está aqui 📍</Popup>
      </Marker>

      {/* Barbeiros no mapa */}
      {barbers.map((barber) => (
        <Marker key={barber.id} position={[barber.lat, barber.lng]}>
          <Popup>
            💈 {barber.nome} <br />
            ⭐ Avaliação: {barber.rating}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Mapa;
