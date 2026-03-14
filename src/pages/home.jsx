import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const login = async () => {

const { error } = await supabase.auth.signInWithPassword({
email,
password
});

if(error){
alert("Erro no login");
}else{
navigate("/mapa");
}

};

return(

<div className="login-container">

<div className="login-box">

<div className="logo">BarberGo</div>

<input
placeholder="E-mail"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Senha"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>ENTRAR</button>

<Link to="/cadastrobarbeiro">
<p style={{marginTop:"20px",color:"#fff"}}>
Criar conta
</p>
</Link>

</div>

</div>

);

}
