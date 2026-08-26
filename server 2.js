const readlineSync = require('readline-sync');

let quantidadeSolicitada = Number(readlineSync.question("Quantidade solicitada: "));
let quantidadeEstoque = Number(readlineSync.question("Quantidade em estoque: "));

if (quantidadeEstoque >= quantidadeSolicitada) {
    console.log("Pedido Confirmado");
} else {
    console.log("Estoque Insuficiente");
}