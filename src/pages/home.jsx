import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../services/supabase";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) return alert("Preencha todos os campos");
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
    if (error) return alert(error.message);

    router.push("/mapa");
  };

  return (
    <div className="login-page" style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/images/salao-luxo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#ffd700"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>BarberGo</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} style={inputStyle} />
      <button onClick={handleLogin} style={buttonStyle}>Entrar</button>
      <button onClick={() => router.push("/cadastrobarbeiro")} style={buttonOutlineStyle}>Criar Conta</button>
    </div>
  );
}

const inputStyle = { marginBottom: "15px", padding: "12px", width: "250px", borderRadius: "8px", border: "2px solid #ffd700", fontWeight: "bold" };
const buttonStyle = { padding: "12px 40px", backgroundColor: "#ffd700", color: "#000", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", fontSize: "1.1rem", marginBottom: "15px" };
const buttonOutlineStyle = { padding: "10px 30px", backgroundColor: "#000", color: "#ffd700", border: "2px solid #ffd700", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" };
