import "./listaBarbeiros.css";
import { useNavigate } from "react-router-dom";

const barbeiros = [
  {
    id: 1,
    nome: "Carlos Barber",
    avaliacao: 4.9,
    especialidades: "Corte Fade, Barba, Sobrancelha",
    foto: "/src/assets/4F0D9D57-C2FE-4F94-B3DB-2123C22AB545.png",
  },
  {
    id: 2,
    nome: "João Style",
    avaliacao: 4.7,
    especialidades: "Tesoura, Moicano, Militar",
    foto: "/src/assets/4F0D9D57-C2FE-4F94-B3DB-2123C22AB545.png",
  },
];

export default function ListaBarbeiros() {
  const navigate = useNavigate();

  const verPerfil = (barbeiro) => {
    navigate("/perfilBarbeiro", { state: barbeiro });
  };

  return (
    <div className="lista-container">
      <h2 className="titulo-lista">Barbeiros Disponíveis</h2>

      {barbeiros.map((b) => (
        <div key={b.id} className="card-barbeiro">
          <img src={b.foto} className="foto-barbeiro" />

          <div className="info-barbeiro">
            <h3>{b.nome}</h3>
            <p>⭐ {b.avaliacao}</p>
            <p>{b.especialidades}</p>

            <button onClick={() => verPerfil(b)} className="btn-ver">
              Ver Perfil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
