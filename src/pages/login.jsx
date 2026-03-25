import React, { useState } from "react";
import "./login.css";
import { supabase } from "../services/supabase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    });

    if (error) {
      setErro("E-mail ou senha incorretos");
      return;
    }

    onLogin();
  };

  return (
    <div className="login-container">
      <div className="overlay">
        <h1 className="logo">BarberGo</h1>

        <form className="form" onSubmit={entrar}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="erro">{erro}</p>}

          <button type="submit">ENTRAR</button>
        </form>

        <p className="criar">Criar conta</p>
      </div>
    </div>
  );
}
