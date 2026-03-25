import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import "./perfilBarbeiro.css";
import { useSearchParams } from "react-router-dom";

export default function PerfilBarbeiro() {
  const [params] = useSearchParams();
  const barberId = params.get("id");

  const [barber, setBarber] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    carregarBarbeiro();
    carregarServicos();
  }, []);

  async function carregarBarbeiro() {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", barberId)
      .single();

    if (error) {
      console.error("Erro ao carregar barbeiro:", error);
      return;
    }

    setBarber(data);
  }

  async function carregarServicos() {
    const { data, error } = await supabase.from("services").select("*");

    if (error) {
      console.error("Erro ao carregar serviços:", error);
      return;
    }

    setServices(data);
  }

  if (!barber) {
    return <div className="carregando">Carregando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <img
        src={
          barber.profile_image && barber.profile_image !== "EMPTY"
            ? barber.profile_image
            : "/placeholder.jpg"
        }
        alt="Foto do barbeiro"
        className="perfil-foto"
      />

      <h2 className="perfil-nome">{barber.name}</h2>
      <p className="perfil-rating">⭐ {barber.rating || 5}</p>

      <p className="perfil-email">{barber.email}</p>
      <p className="perfil-phone">{barber.phone}</p>

      <div className="secao">
        <h3>Descrição</h3>
        <p className="descricao">
          {barber.description || "Este barbeiro ainda não adicionou uma descrição."}
        </p>
      </div>

      <div className="secao">
        <h3>Serviços</h3>

        {services.map((service) => (
          <div key={service.id} className="service-card">
            <p className="service-name">{service.name}</p>
            <p className="service-price">R$ {service.price}</p>
          </div>
        ))}
      </div>

      <div className="botoes-acoes">
        <button className="btn-agendar">Agendar</button>
        <button className="btn-domicilio">Atendimento Domiciliar</button>
      </div>
    </div>
  );
}
