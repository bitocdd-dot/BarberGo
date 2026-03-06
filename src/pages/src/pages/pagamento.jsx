import React, { useState } from "react";

const Pagamento = () => {

const [confirmado,setConfirmado] = useState(false)

const chamarBarbeiro = () =>{

setConfirmado(true)

}

if(confirmado){

return(

<div style={{
background:"#0a0a0a",
color:"white",
height:"100vh",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
fontFamily:"Segoe UI"
}}>

<h1 style={{color:"#D4AF37"}}>

Barbeiro a caminho 🚗💈

</h1>

<p style={{marginTop:"20px"}}>

O barbeiro está indo até você

</p>

<p>

Tempo estimado: 15 minutos

</p>

</div>

)

}

return (

<div style={{
background:"#0a0a0a",
color:"white",
minHeight:"100vh",
padding:"30px",
fontFamily:"Segoe UI"
}}>

<h1 style={{color:"#D4AF37"}}>

Pagamento

</h1>

<h3 style={{marginTop:"30px"}}>

Escolha forma de pagamento

</h3>

<div style={{
background:"#1a1a1a",
padding:"20px",
borderRadius:"10px",
marginTop:"20px"
}}>

<p>💳 Cartão</p>

<p>📱 Pix</p>

<p>💵 Dinheiro</p>

</div>

<button

style={{
marginTop:"40px",
width:"100%",
background:"#D4AF37",
border:"none",
padding:"18px",
borderRadius:"12px",
fontWeight:"bold",
fontSize:"18px",
cursor:"pointer"
}}

onClick={chamarBarbeiro}

>

Confirmar corrida

</button>

</div>

)

}

export default Pagamento
