import React, { useState } from "react";

const Pagamento = () => {
  const [forma, setForma] = useState(null);
  const [confirmado, setConfirmado] = useState(false);
  const [chegada, setChegada] = useState(false);

  const confirmar = () => {
    if (!forma) return alert("Escolha pagamento");
    setConfirmado(true);
  };

  const confirmarChegada = () => {
    setChegada(true);
  };

  if (chegada) {
    return (
      <div style={{ background: "#0a0a0a", color: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Segoe UI" }}>
        <h1 style={{ color: "#D4AF37" }}>Pagamento Liberado 💰</h1>
        <p>Serviço confirmado. Obrigado!</p>
      </div>
    );
  }

  if (confirmado) {
    return (
      <div style={{ background: "#0a0a0a", color: "white", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Segoe UI" }}>
        <h1 style={{ color: "#D4AF37" }}>Barbeiro a caminho 🚗💈</h1>
        <p>O barbeiro está indo até você</p>
        <p>Tempo estimado: 15 minutos</p>
        <button onClick={confirmarChegada} style={{ marginTop: "40px", background: "#D4AF37", color: "#000", border: "none", padding: "15px 30px", borderRadius: "12px", fontSize: "18px", cursor: "pointer" }}>
          Confirmar Chegada
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", padding: "30px", fontFamily: "Segoe UI" }}>
      <h1 style={{ color: "#D4AF37" }}>Pagamento</h1>
      <h3 style={{ marginTop: "30px" }}>Escolha forma de pagamento</h3>
      <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
        <p onClick={() => setForma("cartao")} style={{ cursor: "pointer", background: forma === "cartao" ? "#D4AF37" : "transparent", padding: "10px", borderRadius: "8px" }}>💳 Cartão</p>
        <p onClick={() => setForma("pix")} style={{ cursor: "pointer", background: forma === "pix" ? "#D4AF37" : "transparent", padding: "10px", borderRadius: "8px" }}>📱 Pix</p>
        <p onClick={() => setForma("dinheiro")} style={{ cursor: "pointer", background: forma === "dinheiro" ? "#D4AF37" : "transparent", padding: "10px", borderRadius: "8px" }}>💵 Dinheiro</p>
      </div>
      {forma === "pix" && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Escaneie o QR Code:</p>
          <img src="https://via.placeholder.com/150?text=QR+Pix" alt="QR Pix" style={{ width: "150px", height: "150px" }} />
        </div>
      )}
      <button onClick={confirmar} style={{ marginTop: "40px", width: "100%", background: "#D4AF37", border: "none", padding: "18px", borderRadius: "12px", fontWeight: "bold", fontSize: "18px", cursor: "pointer" }}>
        Confirmar corrida
      </button>
    </div>
  );
};

export default Pagamento;
