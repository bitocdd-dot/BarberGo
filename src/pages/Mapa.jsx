// Mapa.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Mapa() {
  const [barbeiros, setBarbeiros] = useState([]);

  useEffect(() => {
    const fetchBarbeiros = async () => {
      const { data, error } = await supabase.from("barbers").select("*");
      if (error) console.log(error);
      else setBarbeiros(data);
    };
    fetchBarbeiros();
  }, []);

  return (
    <div>
      <h2>Mapa de Barbeiros</h2>
      {barbeiros.length === 0 && <p>Nenhum barbeiro cadastrado ainda.</p>}
      {barbeiros.map((b) => (
        <div key={b.id}>
          {b.nome} - {b.lat}, {b.lng} ⭐ {b.avaliacao}
        </div>
      ))}
    </div>
  );
}
