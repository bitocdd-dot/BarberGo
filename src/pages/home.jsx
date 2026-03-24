import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import './home.css'

export default function Home() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    async function carregarUsuario() {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        navigate('/')
        return
      }

      setUserEmail(data.session.user.email || '')
    }

    carregarUsuario()
  }, [navigate])

  async function sair() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="home-page">
      <div className="home-box">
        <h1>Bem-vindo ao BarberGo</h1>
        <p>Login funcionando com sucesso.</p>
        <p>{userEmail}</p>

        <div className="home-actions">
          <button onClick={() => navigate('/mapa')}>IR PARA O MAPA</button>
          <button className="btn-secundario" onClick={sair}>SAIR</button>
        </div>
      </div>
    </div>
  )
}
