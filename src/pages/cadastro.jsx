import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './cadastro.css'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [tipo, setTipo] = useState('cliente')
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function handleCadastro(e) {
    e.preventDefault()
    setErro('')
    setMensagem('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: {
          nome,
          tipo_usuario: tipo,
        },
      },
    })

    setLoading(false)

    if (error) {
      setErro(error.message)
      return
    }

    setMensagem('Conta criada com sucesso. Se o Supabase exigir confirmação por e-mail, confirme antes de entrar.')
    setNome('')
    setEmail('')
    setSenha('')
    setTipo('cliente')
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-box">
        <h1>Crie sua conta</h1>

        <form onSubmit={handleCadastro} className="cadastro-form">
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="barbeiro">Barbeiro</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'CRIAR CONTA'}
          </button>
        </form>

        {mensagem && <p className="sucesso">{mensagem}</p>}
        {erro && <p className="erro">{erro}</p>}

        <Link to="/" className="link-voltar">
          Voltar para login
        </Link>
      </div>
    </div>
  )
}
