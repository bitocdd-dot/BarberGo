import React, { useEffect, useState } from "react";
import "./pedidosBarbeiro.css";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

const PedidosBarbeiro = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  const barberId = localStorage.getItem("user_id"); // ID do barbeiro logado

  // Buscar pedidos
  const carregarPedidos = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        id, 
        client_id,
        scheduled_at,
        address,
        is_home_service,
        status,
        users (name, phone)
      `)
      .eq("barber_id", barberId)
      .eq("status", "waiting_barber");

    if (!error) {
      setPedidos(data);
    }
  };

  // Rodar ao abrir tela
  useEffect(() => {
    carregarPedidos();
  }, []);

  // Aceitar pedido
  const aceitarPedido = async (id) => {
    await supabase
      .from("appointments")
      .update({ status: "accepted" })
      .eq("id", id);

    alert("Pedido aceito!");
    carregarPedidos();
  };

  // Rejeitar pedido
  const rejeitarPedido = async (id) => {
    await supabase
      .from("appointments")
      .update({ status: "rejected" })
      .eq("id", id);

    alert("Pedido rejeitado.");
    carregarPedidos();
  };

  return (
    <div className="pedidos-container">
      <h2 className="pedidos-title">Pedidos Pendentes</h2>

      {pedidos.length === 0 && <p>Nenhum pedido no momento.</p>}

      {pedidos.map((p) => (
        <div key={p.id} className="pedido-card">
          <div className="pedido-info">
            <strong>Cliente:</strong> {p.users?.name}
          </div>

          <div className="pedido-info">
            <strong>Telefone:</strong> {p.users?.phone}
          </div>

          <div className="pedido-info">
            <strong>Horário:</strong> {new Date(p.scheduled_at).toLocaleString()}
          </div>

          {p.is_home_service && (
            <div className="pedido-info">
              <strong>Endereço:</strong> {p.address}
            </div>
          )}

          <div className="pedido-btns">
            <button className="accept-btn" onClick={() => aceitarPedido(p.id)}>
              Aceitar
            </button>
            <button className="reject-btn" onClick={() => rejeitarPedido(p.id)}>
              Rejeitar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PedidosBarbeiro;
