import { useState } from "react";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");

const cadastrar = async () => {

navigator.geolocation.getCurrentPosition(async (pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

const { error } = await supabase
.from("barbers")
.insert([
{
name:name,
email:email,
phone:phone,
lat:lat,
lng:lng,
rating:5
}
]);

if(error){

alert("Erro ao cadastrar");

}else{

alert("Barbeiro cadastrado com sucesso 💈");

window.location.href="/mapa";

}

});

};

return(

<div style={{
minHeight:"100vh",
background:"#111",
color:"white",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
gap:"15px"
}}>

<h1>Cadastro de Barbeiro</h1>

<input
placeholder="Nome"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{padding:"10px",width:"250px"}}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{padding:"10px",width:"250px"}}
/>

<input
placeholder="Telefone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={{padding:"10px",width:"250px"}}
/>

<button
onClick={cadastrar}
style={{
padding:"15px",
width:"250px",
background:"#f2b705",
border:"none",
borderRadius:"10px",
fontSize:"16px"
}}
>

Cadastrar

</button>

</div>

);

}
