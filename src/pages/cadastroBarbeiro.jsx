import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // certifique-se que o cliente Supabase está configurado

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [avaliacao, setAvaliacao] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("barbers")
      .insert([{ nome, lat: parseFloat(lat), lng: parseFloat(lng), avaliacao }]);

    if (error) {
      alert("Erro ao cadastrar barbeiro: " + error.message);
    } else {
      alert("Barbeiro cadastrado com sucesso!");
      setNome("");
      setLat("");
      setLng("");
      setAvaliacao(5);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Cadastro de Barbeiro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.000001"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.000001"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Avaliação"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
        min={0}
        max={5}
        required
      />
      <button type="submit">Cadastrar Barbeiro</button>
    </form>
  );
}
