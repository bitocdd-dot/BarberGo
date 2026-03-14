import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function PerfilBarbeiro(){

const { id } = useParams();

const [barber,setBarber] = useState(null);

useEffect(()=>{

loadBarber();

},[]);

const loadBarber = async ()=>{

const { data } = await supabase
.from("barbers")
.select("*")
.eq("id",id)
.single();

if(data){
setBarber(data);
}

};

if(!barber){
return <p>Carregando...</p>
}

return(

<div style={{
padding:"20px",
background:"#111",
color:"white",
minHeight:"100vh",
textAlign:"center"
}}>

<img
src={barber.profile_image || "https://i.imgur.com/8Km9tLL.png"}
style={{
width:"120px",
height:"120px",
borderRadius:"100%",
marginBottom:"10px"
}}
/>

<h1>{barber.name}</h1>

<p>⭐ Avaliação: {barber.rating}</p>

<p>Telefone: {barber.phone}</p>

<p>Email: {barber.email}</p>

<h3>Portfólio</h3>

<p>Em breve fotos de cortes...</p>

<button style={{
marginTop:"20px",
padding:"15px",
background:"#f2b705",
border:"none",
borderRadius:"10px"
}}>

Chamar Barbeiro

</button>

</div>

);

}
