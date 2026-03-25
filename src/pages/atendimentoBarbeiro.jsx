import React, { useEffect, useState } from "react";
import "./atendimentoBarbeiro.css";
import { supabase } from "../services/supabase";
import { useNavigate, useLocation } from "react-router-dom";

const AtendimentoBarbeiro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment; // pedido vindo da tela anterior

  const [cliente, setCliente] = useState(null);
  const [status, setStatus] = useState(appointment?.status);

  useEffect(() => {
    buscarCliente();
  }, []);

  const buscarCliente = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("name, phone")
      .eq("id", appointment.client_id)
      .single();

    if (!error) setCliente(data);
  };

  const iniciar = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "in_progress" })
      .eq("id", appointment.id);

    if (!error) {
      setStatus("in_progress");
      alert("Atendimento iniciado!");
    }
  };

  const finalizar = async () => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "awaiting_client_release" })
      .eq("id", appointment.id);

    if (!error) {
      setStatus("awaiting_client_release");
      alert("Corte finalizado! Agora o cliente precisa liberar o pagamento.");
      navigate("/home");
    }
  };

  return (
    <div className="atendimento-container">
      <button className="back-btn" onClick={() => navigate(-1)}>←</button>

      <div className="atendimento-card">
        <h2 className="at-title">Atendimento</h2>

        <div className="info">
          <strong>Cliente:</strong> {cliente?.name}
        </div>

        <div className="info">
          <strong>Telefone:</strong> {cliente?.phone}
        </div>

        <div className="info">
          <strong>Horário:</strong> {new Date(appointment.scheduled_at).toLocaleString()}
        </div>

        {appointment.is_home_service && (
          <div className="info">
            <strong>Endereço:</strong> {appointment.address}
          </div>
        )}

        {status === "accepted" && (
          <button className="btn-iniciar" onClick={iniciar}>
            Iniciar atendimento
          </button>
        )}

        {status === "in_progress" && (
          <button className="btn-finalizar" onClick={finalizar}>
            Finalizar atendimento
          </button>
        )}

        {status === "awaiting_client_release" && (
          <p style={{ marginTop: 20, color: "green" }}>
            Aguardando cliente liberar o pagamento...
          </p>
        )}
      </div>
    </div>
  );
};

export default AtendimentoBarbeiro;
