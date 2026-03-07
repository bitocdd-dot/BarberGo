import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useState } from "react"

const barbeiroIcon = new L.Icon({
  iconUrl:"https://cdn-icons-png.flaticon.com/512/921/921347.png",
  iconSize:[35,35]
})

const barbeiros = [
  {
    id:1,
    nome:"Carlos Barber",
    lat:-22.836,
    lng:-43.273,
    rating:4.9,
    avaliacoes:120,
    descricao:"Especialista em fade, barba e corte social."
  },
  {
    id:2,
    nome:"Rafael Corte",
    lat:-22.834,
    lng:-43.270,
    rating:4.8,
    avaliacoes:98,
    descricao:"Corte moderno, navalhado e barba completa."
  }
]

export default function Mapa(){

  const [barbeiro,setBarbeiro] = useState(null)
  const [perfil,setPerfil] = useState(false)

  return(

    <div style={{height:"100vh",width:"100%",position:"relative"}}>

      <MapContainer
        center={[-22.836,-43.272]}
        zoom={15}
        style={{height:"100%",width:"100%"}}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {barbeiros.map(b=>(
          <Marker
            key={b.id}
            position={[b.lat,b.lng]}
            icon={barbeiroIcon}
            eventHandlers={{
              click:()=>setBarbeiro(b)
            }}
          />
        ))}

      </MapContainer>

      {barbeiro && !perfil &&(

        <div style={{
          position:"absolute",
          bottom:"0",
          left:"0",
          right:"0",
          background:"#000",
          color:"#fff",
          padding:"20px",
          borderTopLeftRadius:"20px",
          borderTopRightRadius:"20px",
          zIndex:9999
        }}>

          <h2>{barbeiro.nome}</h2>

          <p>
          ⭐ {barbeiro.rating}  
          ({barbeiro.avaliacoes} avaliações)
          </p>

          <button
          style={{
            background:"#fff",
            color:"#000",
            border:"none",
            padding:"12px",
            width:"100%",
            borderRadius:"10px",
            marginTop:"10px",
            fontWeight:"bold"
          }}
          onClick={()=>setPerfil(true)}
          >
          VER PERFIL
          </button>

        </div>

      )}

      {perfil && barbeiro &&(

        <div style={{
          position:"absolute",
          top:"0",
          left:"0",
          right:"0",
          bottom:"0",
          background:"#111",
          color:"#fff",
          padding:"25px",
          zIndex:10000
        }}>

          <h1>{barbeiro.nome}</h1>

          <p>⭐ {barbeiro.rating} ({barbeiro.avaliacoes} avaliações)</p>

          <p style={{marginTop:"20px"}}>
          {barbeiro.descricao}
          </p>

          <button
          style={{
            marginTop:"30px",
            background:"#fff",
            color:"#000",
            padding:"12px",
            border:"none",
            borderRadius:"10px",
            width:"100%",
            fontWeight:"bold"
          }}
          >
          CHAMAR BARBEIRO
          </button>

          <button
          style={{
            marginTop:"10px",
            background:"transparent",
            color:"#fff",
            padding:"10px",
            border:"1px solid #fff",
            borderRadius:"10px",
            width:"100%"
          }}
          onClick={()=>setPerfil(false)}
          >
          VOLTAR
          </button>

        </div>

      )}

    </div>
  )
}
