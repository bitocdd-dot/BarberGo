// FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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


// CLIENTE SOLICITA BARBEIRO

function pedirBarbeiro(nome, servico){

set(ref(db, 'pedidoAtual'),{

cliente:nome,
servico:servico,
status:"aguardando"

})

}


// BARBEIRO RECEBE PEDIDO

const pedidoRef = ref(db,'pedidoAtual')

onValue(pedidoRef,(snapshot)=>{

const data = snapshot.val()

if(data){

const cliente = document.getElementById("clienteNome")
const servico = document.getElementById("clienteServico")

if(cliente) cliente.innerText = data.cliente
if(servico) servico.innerText = data.servico

}

})
