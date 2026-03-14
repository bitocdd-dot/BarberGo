import { useState } from "react";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  async function cadastrar(e) {
    e.preventDefault();

    const { error } = await supabase.from("barbers").insert([
      { name, phone, lat, lng, rating: 5 }
    ]);

    if (error) {
      alert("Erro ao cadastrar");
    } else {
      alert("Barbeiro cadastrado!");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Cadastro de Barbeiro</h2>

      <form onSubmit={cadastrar}>
        <input
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
        />

        <br /><br />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
