import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function CadastroBarbeiro() {
  const [nome, setNome] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [avaliacao, setAvaliacao] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("barbers")
      .insert([{ nome, lat: parseFloat(lat), lng: parseFloat(lng), avaliacao }]);
    if (error) alert("Erro: " + error.message);
    else { alert("Barbeiro cadastrado!"); setNome(""); setLat(""); setLng(""); setAvaliacao(5); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:"400px", margin:"auto", padding:"10px" }}>
      <h2>Cadastro de Barbeiro</h2>
      <input type="text" placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)} required style={{ display:"block", width:"100%", margin:"5px 0" }} />
      <input type="number" step="0.000001" placeholder="Latitude" value={lat} onChange={(e)=>setLat(e.target.value)} required style={{ display:"block", width:"100%", margin:"5px 0" }} />
      <input type="number" step="0.000001" placeholder="Longitude" value={lng} onChange={(e)=>setLng(e.target.value)} required style={{ display:"block", width:"100%", margin:"5px 0" }} />
      <input type="number" placeholder="Avaliação" value={avaliacao} onChange={(e)=>setAvaliacao(e.target.value)} min={0} max={5} required style={{ display:"block", width:"100%", margin:"5px 0" }} />
      <button type="submit" style={{ display:"block", width:"100%", margin:"10px 0" }}>Cadastrar Barbeiro</button>
    </form>
  );
}
