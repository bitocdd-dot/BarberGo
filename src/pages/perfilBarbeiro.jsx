import "./perfilBarbeiro.css";
import { useLocation } from "react-router-dom";

export default function PerfilBarbeiro() {
  const { state } = useLocation();
  const barbeiro = state;

  return (
    <div className="perfil-container">
      <img src={barbeiro.foto} className="perfil-foto" />

      <h2>{barbeiro.nome}</h2>
      <p className="avaliacao">⭐ {barbeiro.avaliacao}</p>

      <h3>Especialidades</h3>
      <p>{barbeiro.especialidades}</p>

      <h3>Portfólio</h3>
      <div className="portfolio-box">
        <p>O barbeiro ainda não adicionou fotos.</p>
      </div>

      <button className="btn-agendar">Agendar</button>

      <button className="btn-domicilio">Domicílio</button>
    </div>
  );
}
