const readlineSync = require('realine-sync');
let preco = Number(readlineSync.question("Digite o preço dos produtos: "))
let imposto  = preco * 0.15;
let precofinal = preco + imposto;
console.log ("Preço inicial: R$", preco);
console.log("Imposto(15%): R$", imposto);
console.log("Preço final: R$", precofinal);
