import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Mapa(){

const [barbers,setBarbers] = useState([])
const [userLocation,setUserLocation] = useState(null)

useEffect(()=>{

navigator.geolocation.getCurrentPosition((pos)=>{

setUserLocation([
pos.coords.latitude,
pos.coords.longitude
])

})

loadBarbers()

},[])

async function loadBarbers(){

const { data } = await supabase
.from("barbers")
.select("*")

setBarbers(data)

}

if(!userLocation){
return <h2>Carregando mapa...</h2>
}

return(

<MapContainer center={userLocation} zoom={15} style={{height:"100vh"}}>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Marker position={userLocation}>
<Popup>Você está aqui</Popup>
</Marker>

{barbers.map((b)=>(
<Marker key={b.id} position={[b.lat,b.lng]}>
<Popup>
💈 {b.nome}
<br/>
⭐ {b.rating}
</Popup>
</Marker>
))}

</MapContainer>

)

}

export default Mapa
