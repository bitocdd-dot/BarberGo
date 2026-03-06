import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyBe-xiVQFqy_rdw5pAUXmSQ7fQ6RZpLQ_Q",
authDomain: "barbergo-2f72c.firebaseapp.com",
projectId: "barbergo-2f72c",
storageBucket: "barbergo-2f72c.firebasestorage.app",
messagingSenderId: "862773297159",
appId: "1:862773297159:web:041ec66acd9fc4d9692aa2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



// CLIENTE CHAMA BARBEIRO

window.chamarBarbeiro = function(nomeCliente, servico, barbeiro){

set(ref(db,'pedidoAtual'),{

cliente:nomeCliente,
barbeiro:barbeiro,
servico:servico,
status:"procurando"

})

alert("Pedido enviado para o barbeiro")

}



// BARBEIRO ACEITA PEDIDO

window.aceitarPedido = function(){

update(ref(db,'pedidoAtual'),{

status:"aceito"

})

alert("Você aceitou o cliente")

}



// BARBEIRO INDO ATÉ CLIENTE

window.irCliente = function(){

update(ref(db,'pedidoAtual'),{

status:"caminho"

})

window.location.href="mapa.html"

}



// OUVIR STATUS DO PEDIDO

const pedidoRef = ref(db,'pedidoAtual')

onValue(pedidoRef,(snapshot)=>{

const data = snapshot.val()

if(!data) return

const status = document.getElementById("statusPedido")

if(status){

status.innerText = data.status

}

})
