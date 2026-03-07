import { useState } from "react";
import Home from "./pages/Home";
import Mapa from "./pages/Mapa";

function App() {

const [tela,setTela] = useState("home");

if(tela === "home"){
return <Home entrar={()=>setTela("mapa")} />;
}

if(tela === "mapa"){
return <Mapa />;
}

}

export default App;
