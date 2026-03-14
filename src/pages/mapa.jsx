import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { supabase } from "../services/supabase";
import "leaflet/dist/leaflet.css";

export default function Mapa(){

const [barbers,setBarbers] = useState([]);
const [userLocation,setUserLocation] = useState(null);

useEffect(()=>{

navigator.geolocation.getCurrentPosition((pos)=>{

setUserLocation([
pos.coords.latitude,
pos.coords.longitude
]);

});

loadBarbers();

},[]);

const loadBarbers = async ()=>{

const { data } = await supabase
.from("barbers")
.select("*");

if(data){
setBarbers(data);
}

};

return(

<div className="map-container">

<MapContainer
center={userLocation || [-22.9068,-43.1729]}
zoom={13}
style={{height:"100%",width:"100%"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{barbers.map((b)=>(

<Marker
key={b.id}
position={[b.lat,b.lng]}
>

<Popup>

<b>{b.name}</b>

<br/>

⭐ {b.rating}

<br/>

<button>Ver Perfil</button>

</Popup>

</Marker>

))}

</MapContainer>

<div className="bottom-bar">

<a href="/">Início</a>
<a href="/mapa">Mapa</a>
<a href="#">Agenda</a>
<a href="#">Perfil</a>
<a href="#">Suporte</a>

</div>

</div>

);

}
