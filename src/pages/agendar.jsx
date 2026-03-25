import React, { useEffect, useState } from "react";
import "./agendar.css";
import { supabase } from "../services/supabase";
import { useNavigate, useLocation } from "react-router-dom";

const Agendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const barber = location.state?.barber;

  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [dateTime, setDateTime] = useState("");

  // Carregar serviços do Supabase
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from("services").select("*");
      if (!error) setServices(data);
    };
    fetchServices();
  }, []);

  // Criar Appointment
  const criarAgendamento = async () => {
    if (!serviceId || !dateTime) {
      alert("Selecione serviço e horário");
      return;
    }

    const userId = localStorage.getItem("user_id"); // vamos usar isso depois no login oficial

    const { data, error } = await supabase.from("appointments").insert([
      {
        client_id: userId,
        barber_id: barber.id,
        service_id: serviceId,
        scheduled_at: dateTime,
        status: "pending_payment", // depois vamos ligar ao MercadoPago
      },
    ]);

    if (error) {
      console.log(error);
      alert("Erro ao criar agendamento.");
      return;
    }

    alert("Agendamento criado! Depois ativamos o pagamento.");
    navigate("/home");
  };

  return (
    <div className="agendar-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>

      <div className="agendar-box">
        <h2>Agendar com {barber?.name}</h2>

        <label>Serviço:</label>
        <select
          className="select-field"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — R$ {s.price}
            </option>
          ))}
        </select>

        <label>Data e Hora:</label>
        <input
          type="datetime-local"
          className="datetime-input"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <button className="confirmar-btn" onClick={criarAgendamento}>
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
};

export default Agendar;
