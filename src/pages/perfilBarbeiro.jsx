import React, { useEffect, useState } from "react";
import "./perfilBarbeiro.css";
import { supabase } from "../services/supabase";

const PerfilBarbeiro = ({ barberId, onBack }) => {
  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchBarberData();
    fetchBarberServices();
  }, []);

  // Buscar dados do barbeiro
  async function fetchBarberData() {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();

    if (error) {
      console.log("Erro ao buscar barbeiro:", error);
      return;
    }

    setBarber(data);
  }

  // Buscar serviços
  async function fetchBarberServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*");

    if (error) {
      console.log("Erro ao buscar serviços:", error);
      return;
    }

    setServices(data);
  }

  if (!barber) return <div className="perfil-container">Carregando...</div>;

  return (
    <div className="perfil-container">
      <button className="back-btn" onClick={onBack}>← Voltar</button>

      <div className="perfil-header">
        <img
          src={
            barber.profile_image && barber.profile_image !== "EMPTY"
              ? barber.profile_image
              : "/src/assets/4F0D9D57-C2FE-4F94-B3DB-2123C22AB545.png"
          }
          alt="Foto do barbeiro"
          className="perfil-foto"
        />

        <h2>{barber.name}</h2>
        <p className="rating">⭐ {barber.rating || 5}</p>
      </div>

      <div className="perfil-section">
        <h3>Especialidades</h3>
        <ul>
          {services.map((svc) => (
            <li key={svc.id}>
              {svc.name} — R${svc.price}
            </li>
          ))}
        </ul>
      </div>

      <div className="perfil-section">
        <h3>Portfólio</h3>
        <div className="portfolio-box">
          <p>O barbeiro ainda não adicionou fotos.</p>
        </div>
      </div>

      <div className="perfil-btns">
        <button className="btn agendar-btn">Agendar Horário</button>
        <button className="btn domicilio-btn">Atendimento a Domicílio</button>
      </div>
    </div>
  );
};

export default PerfilBarbeiro;
