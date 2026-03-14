export default function Home() {
  return (
    <div style={{padding:"40px", textAlign:"center"}}>
      <h1>BarberGo</h1>

      <p>Escolha uma opção:</p>

      <br/>

      <a href="/cadastrobarbeiro">
        <button style={{padding:"15px",fontSize:"16px"}}>
          Cadastrar Barbeiro
        </button>
      </a>

      <br/><br/>

      <a href="/mapa">
        <button style={{padding:"15px",fontSize:"16px"}}>
          Ver Barbeiros no Mapa
        </button>
      </a>
    </div>
  );
}
