import React from "react";

const Perfil = () => {

return (

<div style={{
background:"#0a0a0a",
color:"white",
height:"100vh",
padding:"30px",
fontFamily:"Segoe UI"
}}>

<h1 style={{color:"#D4AF37"}}>Barbeiro Lucas</h1>

<p>⭐ Avaliação: 4.7</p>

<p>📍 Duque de Caxias</p>

<h3>Serviços</h3>

<ul>
<li>Corte Degradê</li>
<li>Barba</li>
<li>Sobrancelha</li>
</ul>

<button
style={{
marginTop:"20px",
background:"#D4AF37",
border:"none",
padding:"15px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
onClick={()=>{

window.location.href="/pagamento"

}}
>

Chamar barbeiro

</button>

</div>

)

}

export default Perfil
