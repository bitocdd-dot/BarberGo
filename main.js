// 1. Inicializa o mapa focado no Brasil (por enquanto)
const map = L.map('map').setView([-23.5505, -46.6333], 13);

// 2. Adiciona o desenho do mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// 3. Criar o ícone (marcador) no mapa
let marker = L.marker([-23.5505, -46.6333]).addTo(map);

// 4. Função para atualizar a posição em tempo real
function atualizarPosicao() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Move o marcador e o mapa para a nova posição
            const novaPosicao = [lat, lon];
            marker.setLatLng(novaPosicao);
            map.setView(novaPosicao);
            
            document.getElementById('status').innerText = "Localização atualizada!";
        }, (error) => {
            console.error("Erro ao pegar GPS:", error);
            document.getElementById('status').innerText = "Erro ao acessar GPS.";
        }, {
            enableHighAccuracy: true // Usa o GPS de alta precisão
        });
    }
}

// Inicia a busca assim que a tela carrega
window.onload = atualizarPosicao;
