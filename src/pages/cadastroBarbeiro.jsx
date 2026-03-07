import { useState } from "react";
import { supabase } from "../services/supabase";

function CadastroBarbeiro() {

const [nome,setNome] = useState("");

const cadastrar = async () => {

navigator.geolocation.getCurrentPosition(async (pos)=>{

await supabase
.from("barbers")
.insert({
nome: nome,
lat: pos.coords.latitude,
lng: pos.coords.longitude,
rating: 5
})

alert("Barbeiro cadastrado!");
})

}

return (

<div style={{padding:20}}>

<h1>Cadastro de Barbeiro</h1>

<input
placeholder="Nome do barbeiro"
onChange={(e)=>setNome(e.target.value)}
/>

<button onClick={cadastrar}>
Cadastrar
</button>

</div>

)

}

export default CadastroBarbeiro;
