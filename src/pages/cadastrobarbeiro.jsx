import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function CadastroBarbeiro(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [rating,setRating] = useState("5");

const cadastrar = () => {

navigator.geolocation.getCurrentPosition(async (pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

const { error } = await supabase
.from("barbers")
.insert([
{
name: name,
phone: phone,
rating: rating,
lat: lat,
lng: lng
}
]);

if(error){
alert("Erro ao cadastrar barbeiro");
}else{
alert("Barbeiro cadastrado com sucesso");
navigate("/mapa");
}

});

};

return(

<div style={{padding:"30px"}}>

<h1>Cadastrar Barbeiro</h1>

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
placeholder="Avaliação (1 a 5)"
value={rating}
onChange={(e)=>setRating(e.target.value)}
/>

<button onClick={cadastrar}>
Cadastrar usando minha localização
</button>

</div>

);

}
