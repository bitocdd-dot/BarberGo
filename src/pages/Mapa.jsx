import { MapContainer, TileLayer, Marker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useState } from "react"

const iconOnline = new L.Icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/149/149071.png",
iconSize:[35,35]
})

const iconOcupado = new L.Icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
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
status:"online",
descricao:"Especialista em fade e barba.",
fotos:[
"https://images.unsplash.com/photo-1621605815971-fbc98d665033",
"https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
"https://images.unsplash.com/photo-1622287162716-4a63e6d7b9b3"
]
},

{
id:2,
nome:"Rafael Corte",
lat:-22.834,
lng:-43.270,
rating:4.8,
avaliacoes:98,
status:"ocupado",
descricao:"Cortes modernos e barba completa.",
fotos:[
"https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
"https://images.unsplash.com/photo-1593702288056-f34b0d0d7c0c",
"https://images.unsplash.com/photo-1605497788044-5a32c7078486"
]
}

]

export default function Mapa(){

const [barbeiro,setBarbeiro] = useState(null)
const [perfil,setPerfil] = useState(false)
const [pedido,setPedido] = useState(false)

return(

<div style={{height:"100vh",width:"100%",position:"relative"}}>

<MapContainer
center={[-22.836,-43.272]}
zoom={15}
style={{height:"100%",width:"100%"}}
>

<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

{barbeiros.map(b=>{

if(b.status==="offline") return null

const icon = b.status==="ocupado" ? iconOcupado : iconOnline

return(

<Marker
key={b.id}
position={[b.lat,b.lng]}
icon={icon}
eventHandlers={{
click:()=>setBarbeiro(b)
}}
/>

)

})}

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
⭐ {barbeiro.rating} ({barbeiro.avaliacoes} avaliações)
</p>

<p>
Status: {barbeiro.status==="ocupado" ? "🟡 Ocupado" : "🟢 Online"}
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

{perfil && barbeiro && !pedido &&(

<div style={{
position:"absolute",
top:"0",
left:"0",
right:"0",
bottom:"0",
background:"#111",
color:"#fff",
padding:"25px",
overflow:"scroll",
zIndex:10000
}}>

<h1>{barbeiro.nome}</h1>

<p>⭐ {barbeiro.rating} ({barbeiro.avaliacoes} avaliações)</p>

<p style={{marginTop:"20px"}}>
{barbeiro.descricao}
</p>

<h3 style={{marginTop:"30px"}}>Portfólio</h3>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"10px",
marginTop:"10px"
}}>

{barbeiro.fotos.map((foto,i)=>(
<img
key={i}
src={foto}
style={{
width:"100%",
borderRadius:"10px"
}}
/>
))}

</div>

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
onClick={()=>setPedido(true)}
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

{pedido && barbeiro &&(

<div style={{
position:"absolute",
top:"0",
left:"0",
right:"0",
bottom:"0",
background:"#000",
color:"#fff",
padding:"30px",
zIndex:11000
}}>

<h1>Pedido enviado</h1>

<p style={{marginTop:"20px"}}>
Aguardando {barbeiro.nome} aceitar o serviço.
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
CANCELAR PEDIDO
</button>

</div>

)}

</div>

)

}
