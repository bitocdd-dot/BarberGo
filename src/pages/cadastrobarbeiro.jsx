import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");

  const handleCadastro = async () => {
    if (!nome || !celular || !email || !cpf || !senha || !tipo) return alert("Preencha todos os campos");

    // Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha
    });

    if (authError) return alert(authError.message);

    let lat = null;
    let lng = null;

    if(tipo === "barber") {
      navigator.geolocation.getCurrentPosition(pos => {
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;

        supabase.from("barbers").insert([{
          name: nome,
          email,
          phone: celular,
          cpf,
          type: tipo,
          lat,
          lng
        }]);
      });
    }

    // Salvar em users
    await supabase.from("users").insert([{
      name: nome,
      email,
      phone: celular,
      password: senha,
      account_type: tipo
    }]);

    router.push("/mapa");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#ffd700", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Cadastro</h1>
      <input placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} />
      <input placeholder="Número celular" value={celular} onChange={e => setCelular(e.target.value)} style={inputStyle} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} style={inputStyle} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />

      <div style={{ margin: "15px 0" }}>
        <label style={{ marginRight: "10px" }}>
          <input type="radio" name="tipo" value="cliente" onChange={e => setTipo(e.target.value)} /> Cliente
        </label>
        <label>
          <input type="radio" name="tipo" value="barber" onChange={e => setTipo(e.target.value)} /> Barbeiro
        </label>
      </div>

      <button onClick={handleCadastro} style={buttonStyle}>Cadastrar</button>
    </div>
  );
}

const inputStyle = { marginBottom: "10px", padding: "10px", width: "250px", borderRadius: "8px", border: "2px solid #ffd700" };
const buttonStyle = { padding: "10px 30px", backgroundColor: "#ffd700", color: "#000", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" };
