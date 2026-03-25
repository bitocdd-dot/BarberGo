import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/location";
import { supabase } from "../services/supabase";
import "./home.css";

export default function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);

  // Pegar localização do usuário
  useEffect(() => {
    getCurrentLocation().then((loc) => setUserLocation(loc));
  }, []);

  // Buscar barbeiros no Supabase
  useEffect(() => {
    const fetchBarbers = async () => {
      const { data, error } = await supabase.from("barbers").select("*");

      if (!error) {
        setBarbers(data);
      }
    };

    fetchBarbers();
  }, []);

  return (
    <div className="map-container">
      {/* Mapa */}
      {userLocation && (
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyDxx123EXEMPLO
            &center=${userLocation.lat},${userLocation.lng}
            &zoom=15`}>
        </iframe>
      )}

      {/* Card do barbeiro ao clicar */}
      {selectedBarber && (
        <div className="barber-card-popup">
          <img src={selectedBarber.photo_url} alt="foto" />
          <h2>{selectedBarber.name}</h2>
          <p>⭐ {selectedBarber.rating}</p>
          <p>{selectedBarber.specialties}</p>

          <button
            className="btn-ver-perfil"
            onClick={() => {
              window.location.href = `/perfilBarbeiro?id=${selectedBarber.id}`;
            }}
          >
            Ver Perfil
          </button>

          <button className="btn-fechar" onClick={() => setSelectedBarber(null)}>
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
