import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function PerfilBarbeiro() {
  const router = useRouter();
  const { id } = router.query;
  const [barbeiro, setBarbeiro] = useState(null);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetchBarbeiro();
    fetchServicos();
  }, [id]);

  const fetchBarbeiro = async () => {
    const { data } = await supabase.from("barbers").select("*").eq("id", id).single();
    setBarbeiro(data);
  };

  const fetchServicos = async () => {
    const { data } = await supabase.from("services").select("*").eq("barber_id", id);
    setServicos(data || []);
  };

  if (!barbeiro) return <p style={{ color: "#ffd700", backgroundColor: "#000", minHeight: "100vh", padding: "20px" }}>Carregando...</p>;

  return (
    <div style={{ padding: "20px", color: "#ffd700", backgroundColor: "#000", minHeight: "100vh" }}>
      {barbeiro.profile_image && <img src={barbeiro.profile_image} alt={barbeiro.name} style={{ width: "150px", borderRadius: "50%" }} />}
      <h1>{barbeiro.name}</h1>
      <p>Email: {barbeiro.email}</p>
      <p>Telefone: {barbeiro.phone}</p>
      <p>Nota: {barbeiro.rating || "N/A"}</p>

      <h3>Serviços:</h3>
      <ul>
        {servicos.map(s => (
          <li key={s.id}>{s.name} - R${s.price}</li>
        ))}
      </ul>

      <button style={{ backgroundColor: "#ffd700", color: "#000", padding: "10px", border: "none", fontWeight: "bold", marginTop: "20px" }}>
        Chamar Barbeiro
      </button>
    </div>
  );
}
