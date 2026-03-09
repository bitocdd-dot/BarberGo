import { useState } from "react";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const cadastrar = async () => {
    if (!nome || !lat || !lng) {
      alert("Preencha todos os campos!");
      return;
    }

    const { error } = await supabase
      .from("barbers")
      .insert([
        {
          nome: nome,
          lat: Number(lat),
          lng: Number(lng),
          rating: 5
        }
      ]);

    if (error) {
      alert("Erro ao cadastrar!");
      console.log(error);
    } else {
      alert("Barbeiro cadastrado com sucesso!");
      setNome("");
      setLat("");
      setLng("");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Cadastrar Barbeiro</h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ width: "90%", padding: "10px", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        style={{ width: "90%", padding: "10px", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        style={{ width: "90%", padding: "10px", marginBottom: "10px" }}
      />

      <button onClick={cadastrar} style={{ marginTop: "10px" }}>
        Salvar Barbeiro
      </button>
    </div>
  );
}
