export const servicos = [
    { id: 1, nome: "Corte Degradê", preco: 50.00 },
    { id: 2, nome: "Barba Terapia", preco: 35.00 },
    { id: 3, nome: "Combo Premium", preco: 80.00 }
];

export function calcularTotal(selecionados) {
    return selecionados.reduce((total, item) => total + item.preco, 0);
}
