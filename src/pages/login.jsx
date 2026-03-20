import './login.css';

export default function Login() {
  return (
    <div className="login-container">

      <img 
        src="/src/assets/4F0D9D57-C2FE-4F94-B3DB-2123C22AB545.png"
        className="login-bg"
      />

      <div className="login-box">
        <h2>Barber Go</h2>

        <input type="email" placeholder="E-mail" className="input" />
        <input type="password" placeholder="Senha" className="input" />

        <button className="btn">ENTRAR</button>

        <a className="link" href="/cadastrobarbeiro">Criar conta</a>
      </div>
    </div>
  );
}
