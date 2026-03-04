export function logar() {
    const email = document.getElementById('email').value;
    if(email) {
        alert('Bem-vindo ao BarberGo!');
        window.location.href = "mapa.html";
    } else { 
        alert('Por favor, preencha seu e-mail!'); 
    }
}

export function cadastrar() {
    alert('Conta criada com sucesso! Agora você pode fazer login.');
    window.location.href = "login-cliente.html";
}
