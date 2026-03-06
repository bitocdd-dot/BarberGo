import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mapa from "./pages/Mapa";
import Perfil from "./pages/perfil";
import Pagamento from "./pages/pagamento";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Mapa />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/pagamento" element={<Pagamento />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
