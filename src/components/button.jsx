export default function Button({ label, onClick, color="blue" }) {
  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-white ${colors[color]} py-3 rounded-xl font-semibold active:scale-95 transition`}
    >
      {label}
    </button>
  );
}
