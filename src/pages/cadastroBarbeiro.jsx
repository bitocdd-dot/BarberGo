import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [avaliacao, setAvaliacao] = useState(5);

  const cadastrar = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("barbers").insert([
      {
        nome,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        avaliacao: parseFloat(avaliacao)
      }
    ]);

    if (error) {
      alert("Erro ao cadastrar barbeiro");
      console.log(error);
    } else {
      alert("Barbeiro cadastrado!");
      setNome("");
      setLat("");
      setLng("");
      setAvaliacao(5);
    }
  };

  return (
    <form onSubmit={cadastrar} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Cadastro de Barbeiro</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Avaliação"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
        min="0"
        max="5"
        step="0.1"
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button type="submit" style={{ width: "100%" }}>
        Cadastrar
      </button>
    </form>
  );
}
