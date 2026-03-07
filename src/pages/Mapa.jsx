import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useState } from "react"

const barbeiros = [
  {
    id:1,
    nome:"Carlos Barber",
    lat:-22.836,
    lng:-43.273,
    rating:4.9,
    avaliacoes:120
  },
  {
    id:2,
    nome:"Rafael Corte",
    lat:-22.834,
    lng:-43.270,
    rating:4.8,
    avaliacoes:98
  }
]

export default function Mapa(){

  const [barbeiro,setBarbeiro] = useState(null)

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
            eventHandlers={{
              click:()=>setBarbeiro(b)
            }}
          />
        ))}

      </MapContainer>

      {barbeiro &&(

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
          onClick={()=>alert("Abrir perfil do barbeiro")}
          >
          VER BARBEIRO
          </button>

        </div>

      )}

    </div>
  )
}
