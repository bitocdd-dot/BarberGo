import "./barberCard.css";

export default function BarberCard({
  id,
  name,
  profile_image,
  rating,
  onClick,
}) {
  return (
    <div className="card-container">
      <img
        src={
          profile_image && profile_image !== "EMPTY"
            ? profile_image
            : "/placeholder.jpg"
        }
        alt="foto"
        className="card-foto"
      />

      <div className="card-info">
        <h3>{name}</h3>
        <p className="card-rating">⭐ {rating || 5}</p>

        <button onClick={onClick} className="btn-card-perfil">
          Ver Perfil
        </button>
      </div>
    </div>
  );
}
