import React from "react";

const Perfil = () => {
  // Dados fictícios - depois você puxa do Firebase ou URL params (?barberId=...)
  const barber = {
    name: "Lucas Style",
    photo: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8",
    rating: 4.8,
    location: "Duque de Caxias, RJ",
    status: "Disponível agora",
    services: [
      { name: "Corte Degradê", price: 35 },
      { name: "Barba Completa", price: 25 },
      { name: "Sobrancelha", price: 15 },
      { name: "Selagem", price: 80 },
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1581235720704-06d8b52b2a6d",
      "https://images.unsplash.com/photo-1621605816030-6ded6b2a5a2f",
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1",
    ],
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Cabeçalho */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src={barber.photo}
          alt={barber.name}
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #D4AF37",
            boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
          }}
        />
        <h1 style={{ color: "#D4AF37", margin: "15px 0 5px", fontSize: "28px" }}>
          {barber.name}
        </h1>
        <div style={{ fontSize: "18px", marginBottom: "8px" }}>
          {"⭐".repeat(Math.floor(barber.rating))} {barber.rating.toFixed(1)}
        </div>
        <p style={{ color: "#aaa", margin: "5px 0" }}>📍 {barber.location}</p>
        <p
          style={{
            color: barber.status.includes("Disponível") ? "#00ff00" : "#ff4444",
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "10px",
            animation: barber.status.includes("Disponível") ? "pulse 2s infinite" : "none",
          }}
        >
          🟢 {barber.status}
        </p>
      </div>

      {/* Portfólio */}
      <h2 style={{ margin: "30px 0 15px", color: "#D4AF37" }}>Portfólio</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "15px",
          paddingBottom: "10px",
        }}
      >
        {barber.portfolio.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Corte ${i + 1}`}
            style={{
              width: "180px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "2px solid #333",
            }}
          />
        ))}
      </div>

      {/* Serviços */}
      <h2 style={{ margin: "40px 0 15px", color: "#D4AF37" }}>Serviços</h2>
      <div
        style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
        }}
      >
        {barber.services.map((serv, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",
              borderBottom: i < barber.services.length - 1 ? "1px solid #333" : "none",
            }}
          >
            <span style={{ fontSize: "16px" }}>{serv.name}</span>
            <span style={{ color: "#D4AF37", fontWeight: "bold" }}>R$ {serv.price}</span>
          </div>
        ))}
      </div>

      {/* Botão Chamar */}
      <button
        onClick={() => {
          alert("Chamando barbeiro... Aguarde confirmação!");
          // Aqui vai pro pagamento ou chat
          window.location.href = "/pagamento";
        }}
        style={{
          marginTop: "40px",
          width: "100%",
          background: "linear-gradient(135deg, #D4AF37, #b8972e)",
          color: "#000",
          border: "none",
          padding: "20px",
          borderRadius: "50px",
          fontWeight: "bold",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(212, 175, 55, 0.4)",
          transition: "all 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        CHAMAR BARBEIRO AGORA 🚀
      </button>

      {/* Navegação inferior */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#000",
          display: "flex",
          justifyContent: "space-around",
          padding: "15px 0",
          borderTop: "1px solid #333",
        }}
      >
        <div style={{ textAlign: "center", color: "#D4AF37" }}>🏠 Início</div>
        <div style={{ textAlign: "center" }}>📅 Agenda</div>
        <div style={{ textAlign: "center" }}>💰 Ganhos</div>
        <div style={{ textAlign: "center" }}>☰ Menu</div>
      </div>

      {/* Animação pulse pro status */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Perfil;
