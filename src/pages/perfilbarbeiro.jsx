import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function PerfilBarbeiro() {
  const { id } = useParams();
  const [barbeiro, setBarbeiro] = useState(null);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetchBarbeiro();
    fetchServicos();
  }, [id]);

  const fetchBarbeiro = async () => {
    const { data, error } = await supabase
      .from("barbers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.log(error);
    setBarbeiro(data);
  };

  const fetchServicos = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*");

    if (error) console.log(error);
    setServicos(data || []);
  };

  if (!barbeiro)
    return (
      <p
        style={{
          color: "#ffd700",
          backgroundColor: "#000",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        Carregando perfil...
      </p>
    );

  return (
    <div
      style={{
        padding: "20px",
        color: "#ffd700",
        backgroundColor: "#000",
        minHeight: "100vh",
      }}
    >
      {barbeiro.profile_image && (
        <img
          src={barbeiro.profile_image}
          alt={barbeiro.name}
          style={{ width: "150px", borderRadius: "50%", marginBottom: "20px" }}
        />
      )}

      <h1>{barbeiro.name}</h1>
      <p><b>Email:</b> {barbeiro.email}</p>
      <p><b>Telefone:</b> {barbeiro.phone}</p>
      <p><b>Nota:</b> {barbeiro.rating || "N/A"}</p>

      <h3 style={{ marginTop: "25px" }}>Serviços oferecidos:</h3>
      <ul>
        {servicos.map((s) => (
          <li key={s.id}>
            {s.name} – R${s.price}
          </li>
        ))}
      </ul>

      <button
        style={{
          backgroundColor: "#ffd700",
          color: "#000",
          padding: "12px",
          width: "100%",
          border: "none",
          fontWeight: "bold",
          marginTop: "25px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Chamar Barbeiro
      </button>
    </div>
  );
}
