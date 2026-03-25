export default function Card({ children }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-3 border border-gray-200">
      {children}
    </div>
  );
}
