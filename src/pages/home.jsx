export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>BarberGo</h1>

      <p>Bem-vindo! Escolha uma opção:</p>

      <a href="/cadastrobarbeiro">
        <button>Cadastrar Barbeiro</button>
      </a>

      <br />
      <br />

      <a href="/mapa">
        <button>Ver Mapa</button>
      </a>
    </div>
  );
}
