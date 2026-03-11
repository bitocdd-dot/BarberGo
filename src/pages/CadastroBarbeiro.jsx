import React, { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function CadastroBarbeiro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("barbers").insert([
      {
        name,
        email,
        phone,
        lat: Number(lat),
        lng: Number(lng),
        rating: Number(rating),
      },
    ]);

    if (error) {
      alert("Erro ao cadastrar barbeiro: " + error.message);
    } else {
      alert("Barbeiro cadastrado com sucesso!");
      navigate("/Mapa"); // redireciona para o mapa
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro de Barbeiro</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="1"
          max="5"
        />
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px" }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
