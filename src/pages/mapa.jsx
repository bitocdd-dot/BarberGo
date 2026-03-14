import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { supabase } from "../services/supabase";
import "leaflet/dist/leaflet.css";

export default function Mapa(){

const [barbers,setBarbers] = useState([]);
const [userLocation,setUserLocation] = useState(null);
const [selectedBarber,setSelectedBarber] = useState(null);

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

<div style={{height:"100vh"}}>

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
eventHandlers={{
click: () => {
setSelectedBarber(b)
}
}}
>

</Marker>

))}

</MapContainer>

{selectedBarber && (

<div style={{
position:"fixed",
bottom:"0",
width:"100%",
background:"#111",
padding:"20px",
borderTopLeftRadius:"20px",
borderTopRightRadius:"20px",
boxShadow:"0 -5px 20px rgba(0,0,0,0.5)",
color:"white"
}}>

<h2>{selectedBarber.name}</h2>

<p>⭐ {selectedBarber.rating}</p>

<a href={"/perfilbarbeiro/" + selectedBarber.id}>

<button style={{
width:"100%",
padding:"15px",
background:"#f2b705",
border:"none",
borderRadius:"10px",
fontSize:"16px"
}}>
VER PERFIL
</button>

</a>

</div>

)}

</div>

);

}
