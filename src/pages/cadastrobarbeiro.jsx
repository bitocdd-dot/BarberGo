import { useState } from "react";
import { supabase } from "../services/supabase";

export default function CadastroBarbeiro(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");
const [accountType,setAccountType] = useState("client");

const cadastrar = async () => {

if(!name || !email || !password){

alert("Preencha os campos obrigatórios");

return;

}

const { error } = await supabase
.from("users")
.insert([
{
name:name,
email:email,
phone:phone,
password:password,
account_type:accountType
}
]);

if(error){

alert("Erro ao criar conta");

return;

}

if(accountType === "barber"){

navigator.geolocation.getCurrentPosition(async (pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

await supabase
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

window.location.href="/mapa";

});

}else{

window.location.href="/mapa";

}

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

<h1>Cadastro BarberGo</h1>

<input
placeholder="Nome"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{padding:"10px",width:"260px"}}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{padding:"10px",width:"260px"}}
/>

<input
placeholder="Telefone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
style={{padding:"10px",width:"260px"}}
/>

<input
placeholder="Senha"
type="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{padding:"10px",width:"260px"}}
/>

<select
value={accountType}
onChange={(e)=>setAccountType(e.target.value)}
style={{padding:"10px",width:"260px"}}
>

<option value="client">Cliente</option>
<option value="barber">Barbeiro</option>

</select>

<button
onClick={cadastrar}
style={{
padding:"15px",
width:"260px",
background:"#f2b705",
border:"none",
borderRadius:"10px",
fontSize:"16px"
}}
>

Criar Conta

</button>

</div>

);

}
