import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import "./listaBarbeiros.css";
import { useNavigate } from "react-router-dom";

export default function ListaBarbeiros() {
  const [barbers, setBarbers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBarbers();
  }, []);

  async function loadBarbers() {
    const { data, error } = await supabase.from("barbers").select("*");

    if (error) {
      console.error("Erro ao carregar barbeiros:", error);
      return;
    }

    setBarbers(data);
  }

  function abrirPerfil(id) {
    navigate(`/perfilBarbeiro?id=${id}`);
  }

  return (
    <div className="lista-container">
      <h2 className="titulo-lista">Barbeiros Disponíveis</h2>

      {barbers.map((barber) => (
        <div className="barber-card" key={barber.id}>
          <img
            src={
              barber.profile_image && barber.profile_image !== "EMPTY"
                ? barber.profile_image
                : "/placeholder.jpg"
            }
            alt="Foto"
            className="barber-foto"
          />

          <div className="barber-info">
            <h3>{barber.name}</h3>
            <p className="rating">⭐ {barber.rating || 5}</p>
            <p className="email">{barber.email}</p>

            <button
              onClick={() => abrirPerfil(barber.id)}
              className="btn-ver-perfil"
            >
              Ver Perfil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
