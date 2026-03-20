<div className="login-container" style={{
  backgroundImage: `url(${loginImage})`, // só a imagem de fundo
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px'
}}>
  <div className="login-box">
    <h1>BarberGo</h1>
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      <button type="submit">ENTRAR</button>
    </form>
    <p><a href="/cadastrobarbeiro">Criar conta</a></p>
  </div>
</div>
