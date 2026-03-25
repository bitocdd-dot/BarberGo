import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import "./perfilBarbeiro.css";
import { useParams, useNavigate } from "react-router-dom";

export default function PerfilBarbeiro() {
  const { barberId } = useParams();
  const navigate = useNavigate();

  const [barber, setBarber] = useState(null);

  useEffect(() => {
    loadBarber();
  }, []);

  const loadBarber = async () => {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();

    if (!error) setBarber(data);
  };

  return (
    <div className="perfil-page">
      {barber && (
        <div className="perfil-container">
          <img
            src={barber.profile_image || "https://via.placeholder.com/150"}
            className="perfil-img"
            alt="Barbeiro"
          />

          <h2>{barber.name}</h2>
          <p className="perfil-rating">⭐ {barber.rating || "Sem avaliação"}</p>

          <h3 className="perfil-section-title">Especialidades</h3>
          <p className="perfil-text">Corte masculino, degradê, barba, navalhado</p>

          <h3 className="perfil-section-title">Sobre</h3>
          <p className="perfil-text">
            Profissional com experiência, atendimento domiciliar e na barbearia.
          </p>

          {/* BOTÃO AGENDAR */}
          <button
            className="perfil-btn"
            onClick={() => navigate(`/servicos/${barberId}`)}
          >
            Agendar Serviço
          </button>
        </div>
      )}
    </div>
  );
}
