import React, { useState } from "react";
import "./domicilio.css";
import { supabase } from "../services/supabase";
import { useNavigate, useLocation } from "react-router-dom";

const Domicilio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const barber = location.state?.barber;

  const [endereco, setEndereco] = useState("");
  const [dateTime, setDateTime] = useState("");

  const enviarPedido = async () => {
    if (!endereco || !dateTime) {
      alert("Preencha endereço e horário!");
      return;
    }

    const userId = localStorage.getItem("user_id");

    const { data, error } = await supabase.from("appointments").insert([
      {
        client_id: userId,
        barber_id: barber.id,
        service_id: null, // atendimento a domicílio pode ser sem serviço fixo
        scheduled_at: dateTime,
        status: "waiting_barber",
        address: endereco,
        is_home_service: true,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Erro ao enviar pedido!");
      return;
    }

    alert("Pedido enviado, aguardando o barbeiro aceitar!");
    navigate("/home");
  };

  return (
    <div className="domicilio-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>

      <div className="domicilio-box">
        <h2>Atendimento a Domicílio</h2>
        <p>Barbeiro: <strong>{barber?.name}</strong></p>

        <label>Endereço completo:</label>
        <input
          className="input-field"
          type="text"
          placeholder="Rua, número, bairro..."
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        <label>Data e hora:</label>
        <input
          type="datetime-local"
          className="input-field"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <button className="confirmar-btn" onClick={enviarPedido}>
          Enviar pedido
        </button>
      </div>
    </div>
  );
};

export default Domicilio;
