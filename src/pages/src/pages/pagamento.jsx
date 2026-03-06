import React, { useState } from "react";

const Pagamento = () => {
  const [confirmado, setConfirmado] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState(null); // 'cartao', 'pix', 'dinheiro'

  const chamarBarbeiro = () => {
    if (!formaPagamento) {
      alert("Escolha uma forma de pagamento antes de confirmar.");
      return;
    }
    setConfirmado(true);
  };

  if (confirmado) {
    return (
      <div
        style={{
          background: "#0a0a0a",
          color: "white",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Segoe UI",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ color: "#D4AF37", fontSize: "32px", marginBottom: "20px" }}>
          Barbeiro a caminho 🚗💈
        </h1>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          O barbeiro está indo até você
        </p>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#D4AF37" }}>
          Tempo estimado: 15 minutos
        </p>
        <p style={{ fontSize: "16px", opacity: 0.8, marginTop: "30px" }}>
          Forma de pagamento selecionada: {formaPagamento === "cartao" ? "Cartão" : formaPagamento === "pix" ? "Pix" : "Dinheiro"}
        </p>
        <button
          onClick={() => setConfirmado(false)}
          style={{
            marginTop: "40px",
            background: "#444",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "12px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "white",
        minHeight: "100vh",
        padding: "30px 20px",
        fontFamily: "Segoe UI",
      }}
    >
      <h1 style={{ color: "#D4AF37", textAlign: "center", marginBottom: "30px" }}>
        Pagamento
      </h1>

      <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
        Escolha a forma de pagamento
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "40px" }}>
        <div
          onClick={() => setFormaPagamento("cartao")}
          style={{
            background: formaPagamento === "cartao" ? "#D4AF37" : "#1a1a1a",
            color: formaPagamento === "cartao" ? "#000" : "white",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
            border: formaPagamento === "cartao" ? "2px solid #D4AF37" : "none",
          }}
        >
          <span style={{ fontSize: "24px" }}>💳</span>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Cartão</span>
        </div>

        <div
          onClick={() => setFormaPagamento("pix")}
          style={{
            background: formaPagamento === "pix" ? "#D4AF37" : "#1a1a1a",
            color: formaPagamento === "pix" ? "#000" : "white",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
            border: formaPagamento === "pix" ? "2px solid #D4AF37" : "none",
          }}
        >
          <span style={{ fontSize: "24px" }}>📱</span>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Pix</span>
        </div>

        <div
          onClick={() => setFormaPagamento("dinheiro")}
          style={{
            background: formaPagamento === "dinheiro" ? "#D4AF37" : "#1a1a1a",
            color: formaPagamento === "dinheiro" ? "#000" : "white",
            padding: "20px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
            border: formaPagamento === "dinheiro" ? "2px solid #D4AF37" : "none",
          }}
        >
          <span style={{ fontSize: "24px" }}>💵</span>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Dinheiro</span>
        </div>
      </div>

      <button
        onClick={chamarBarbeiro}
        style={{
          width: "100%",
          background: "#D4AF37",
          color: "#000",
          border: "none",
          padding: "20px",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
        }}
      >
        Confirmar e Chamar Barbeiro
      </button>
    </div>
  );
};

export default Pagamento;
