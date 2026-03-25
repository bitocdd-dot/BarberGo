import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./serviceSelector.css";
import { useParams, useNavigate } from "react-router-dom";

export default function ServiceSelector() {
  const { barberId } = useParams();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    loadServices();
    loadBarber();
  }, []);

  const loadServices = async () => {
    const { data, error } = await supabase.from("services").select("*");

    if (!error) {
      setServices(data);
    }
  };

  const loadBarber = async () => {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();

    if (!error) {
      setBarber(data);
    }
  };

  const handleSelectService = (service) => {
    navigate(`/confirmar-agendamento/${barberId}/${service.id}`);
  };

  return (
    <div className="service-page">
      {barber && (
        <div className="service-header">
          <img
            src={barber.profile_image || "https://via.placeholder.com/150"}
            alt="Barbeiro"
            className="service-barber-img"
          />
          <h2>{barber.name}</h2>
          <p className="service-subtitle">Escolha um serviço para continuar</p>
        </div>
      )}

      <div className="service-list">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-info">
              <h3>{service.name}</h3>
              <p>{service.description}</p>

              <div className="service-details">
                <span className="service-price">R$ {service.price}</span>
                <span className="service-time">{service.duration_minutes} min</span>
              </div>
            </div>

            <button
              className="service-btn"
              onClick={() => handleSelectService(service)}
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
