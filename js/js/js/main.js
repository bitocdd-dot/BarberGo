import { logar, cadastrar } from './auth.js';

window.handleLogin = () => {
    const email = document.getElementById('email').value;
    logar(email);
};

window.handleCadastro = () => {
    cadastrar();
};

console.log("BarberGo System: Online");
