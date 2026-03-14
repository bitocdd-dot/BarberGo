import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function CadastroBarbeiro() {

const navigate = useNavigate();

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [cpf,setCpf] = useState("");
const [type,setType] = useState("client");

const cadastrar = () => {

navigator.geolocation.getCurrentPosition(async (pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

const { error } = await supabase
.from("barbers")
.insert([
{
name:name,
phone:phone,
email:email,
cpf:cpf,
type:type,
rating:5,
lat:lat,
lng:lng
}
]);

if(error){

alert("Erro ao cadastrar");

}else{

alert("Conta criada com sucesso");

navigate("/mapa");

}

});

};

return(

<div style={{
height:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
background:"#111",
color:"white",
padding:"20px"
}}>

<h1>Cadastro BarberGo</h1>

<input
placeholder="Nome"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Telefone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
placeholder="CPF"
value={cpf}
onChange={(e)=>setCpf(e.target.value)}
/>

<select
value={type}
onChange={(e)=>setType(e.target.value)}
>

<option value="client">Cliente</option>
<option value="barber">Barbeiro</option>

</select>

<button
onClick={cadastrar}
style={{
marginTop:"20px",
padding:"15px",
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
