import { useState } from "react";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState("");

  const salvarBarbeiroComGPS = () => {
    if (!nome) {
      alert("Digite seu nome para salvar.");
      return;
    }

    if (!navigator.geolocation) {
      alert("GPS não suportado no dispositivo.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const { error } = await supabase
          .from("barbers")
          .insert([{ nome, lat, lng }]);

        if (error) {
          alert("Erro ao salvar barbeiro.");
        } else {
          alert("Barbeiro salvo com sucesso!");
        }
      },
      () => {
        alert("Não foi possível pegar sua localização.");
      }
    );
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Cadastrar Barbeiro</h2>

      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="input"
      />

      <button onClick={salvarBarbeiroComGPS} className="btn">
        Salvar usando minha localização atual
      </button>
    </div>
  );
}
