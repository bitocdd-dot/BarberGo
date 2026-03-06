import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getCurrentLocation, watchLocation, stopWatching, getNearbyBarbers } from "../services/location";
import barbers from "../services/barbersData";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
iconRetinaUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
iconUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
});

const Mapa = () => {

const [userPos,setUserPos] = useState(null)
const [nearby,setNearby] = useState([])
const [selectedBarber,setSelectedBarber] = useState(null)

useEffect(()=>{

getCurrentLocation()
.then(pos=>{
setUserPos(pos)
setNearby(getNearbyBarbers(pos,barbers))
})

watchLocation(newPos=>{
setUserPos(newPos)
setNearby(getNearbyBarbers(newPos,barbers))
})

return()=>stopWatching()

},[])

if(!userPos){

return(

<div style={{
height:'100vh',
display:'flex',
alignItems:'center',
justifyContent:'center',
fontSize:'20px'
}}>

Carregando mapa BarberGo...

</div>

)

}

return(

<div style={{height:'100vh'}}>

<MapContainer
center={[userPos.lat,userPos.lng]}
zoom={14}
style={{height:'100%',width:'100%'}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Marker position={[userPos.lat,userPos.lng]} />

{nearby.map(barber=>(

<Marker
key={barber.id}
position={[barber.lat,barber.lng]}
eventHandlers={{
click:()=>setSelectedBarber(barber)
}}
/>

))}

</MapContainer>

{selectedBarber && (

<div style={{
position:"absolute",
bottom:"0",
left:"0",
right:"0",
background:"#111",
padding:"20px",
borderTopLeftRadius:"20px",
borderTopRightRadius:"20px",
color:"white"
}}>

<h2>{selectedBarber.name}</h2>

<p>⭐ {selectedBarber.rating}</p>

<p>{selectedBarber.services.join(", ")}</p>

<p>{selectedBarber.distance} km de você</p>

<button
style={{
background:"#D4AF37",
border:"none",
padding:"15px",
width:"100%",
borderRadius:"10px",
fontWeight:"bold"
}}

onClick={()=>{

window.location.href="/perfil"

}}

>

VER PERFIL

</button>

</div>

)}

</div>

)

}

export default Mapa
