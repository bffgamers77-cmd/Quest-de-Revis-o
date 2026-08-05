let precos = [100, 250, 80, 350, 500];

console.log("Precos com 10% de desconto:");

for (let i = 0; i < precos.length; i++) {
    let novoPreco = precos[i] * 0.90;
    console.log("Item", i + 1 + ":", "R$", novoPreco.toFixed(2));
}