import React from "react";

const Perfil = () => {

return (

<div style={{
background:"#0a0a0a",
color:"white",
minHeight:"100vh",
padding:"30px",
fontFamily:"Segoe UI"
}}>

<div style={{textAlign:"center"}}>

<img
src="https://images.unsplash.com/photo-1622287162716-f311baa1a2b8"
alt="barbeiro"
style={{
width:"120px",
height:"120px",
borderRadius:"100%",
objectFit:"cover",
border:"3px solid #D4AF37"
}}
/>

<h1 style={{color:"#D4AF37",marginTop:"10px"}}>

Barbeiro Lucas

</h1>

<p>⭐ Avaliação: 4.7</p>

<p>📍 Duque de Caxias</p>

<p style={{
color:"#4CAF50",
fontWeight:"bold"
}}>

Disponível agora

</p>

</div>


<h2 style={{marginTop:"30px"}}>

Serviços

</h2>

<div style={{
background:"#1a1a1a",
padding:"20px",
borderRadius:"10px"
}}>

<p>✂️ Corte Degradê — R$30</p>

<p>🧔 Barba — R$20</p>

<p>👁️ Sobrancelha — R$10</p>

</div>


<button
style={{
marginTop:"30px",
width:"100%",
background:"#D4AF37",
border:"none",
padding:"18px",
borderRadius:"12px",
fontWeight:"bold",
fontSize:"18px",
cursor:"pointer"
}}
onClick={()=>{

window.location.href="/pagamento"

}}
>

Chamar barbeiro 🚀

</button>

</div>

)

}

export default Perfil
