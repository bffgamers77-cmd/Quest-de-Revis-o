const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function pergunta(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => {
            resolve(resposta);
        });
    });
}
class Habitat {
    #id;
    #nome;
    constructor(id, nome) {
        this.#id = id;
        this.nome = nome;
    }
    get id() {
        return this.#id;
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        if (typeof nome !== "string" || nome.trim().length < 3) {
            throw new Error("O nome do habitat deve ter no mínimo 3 caracteres.");
        }
        this.#nome = nome;
    }
}
class Criatura {
    #id;
    #nome;
    #idHabitat;
    constructor(id, nome, idHabitat) {
        this.id = id;
        this.nome = nome;
        this.idHabitat = idHabitat;
    }
    get id() {
        return this.#id;
    }
    set id(id) {
        if (id === undefined || id === null || id === "") {
            throw new Error("O ID da criatura é obrigatório.");
        }
        this.#id = id;
    }
    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        if (typeof nome !== "string" || nome.trim().length < 3) {
            throw new Error("O nome da criatura deve ter no mínimo 3 caracteres.");
        }
        this.#nome = nome;
    }
    get idHabitat() {
        return this.#idHabitat;
    }
    set idHabitat(idHabitat) {
        if (idHabitat === undefined || idHabitat === null || idHabitat === "") {
            throw new Error("O ID do habitat é obrigatório.");
        }
        this.#idHabitat = idHabitat;
    }
    exibir() {
        console.log(`ID: ${this.#id}`);
        console.log(`Nome: ${this.#nome}`);
        console.log(`ID Habitat: ${this.#idHabitat}`);
    }
}
class CyberPet extends Criatura {
    #nivelBateria;
    constructor(id, nome, idHabitat, nivelBateria) {
        super(id, nome, idHabitat);
        this.nivelBateria = nivelBateria;
    }
    get nivelBateria() {
        return this.#nivelBateria;
    }
    set nivelBateria(nivelBateria) {
        if (typeof nivelBateria !== "number" || nivelBateria < 0 || nivelBateria > 100) {
            throw new Error("O nível da bateria deve estar entre 0 e 100.");
        }
        this.#nivelBateria = nivelBateria;
    }
    exibir() {
        console.log("=== CYBER PET ===");
        console.log(`ID: ${this.id}`);
        console.log(`Nome: ${this.nome}`);
        console.log(`ID Habitat: ${this.idHabitat}`);
        console.log(`Nível da bateria: ${this.nivelBateria}%`);
    }
}
class OrganicPet extends Criatura {
    #tipoDieta;
    constructor(id, nome, idHabitat, tipoDieta) {
        super(id, nome, idHabitat);
        this.tipoDieta = tipoDieta;
    }
    get tipoDieta() {
        return this.#tipoDieta;
    }
    set tipoDieta(tipoDieta) {
        const dietasPermitidas = ["carnivoro", "herbivoro", "omnivoro"];

        if (!dietasPermitidas.includes(tipoDieta.toLowerCase())) {
            throw new Error("Dieta inválida.");
        }

        this.#tipoDieta = tipoDieta.toLowerCase();
    }
    exibir() {
        console.log("=== ORGANIC PET ===");
        console.log(`ID: ${this.id}`);
        console.log(`Nome: ${this.nome}`);
        console.log(`ID Habitat: ${this.idHabitat}`);
        console.log(`Tipo de dieta: ${this.tipoDieta}`);
    }
}
async function iniciar() {
    try {
        console.log("Iniciando Exo-Shelter Diagnostics...\n");
        const nomeHabitat = await pergunta("Digite o nome do Habitat: ");
        const habitatMarte = new Habitat(101, nomeHabitat);
        console.log(`\n✔ Habitat "${habitatMarte.nome}" estabelecido com sucesso!\n`);
        const nomeCyber = await pergunta("Digite o nome do CyberPet: ");
        const bateria = Number(await pergunta("Digite o nível da bateria (0-100): "));
        const nomeOrganic = await pergunta("Digite o nome do OrganicPet: ");
        const dieta = await pergunta("Digite a dieta (carnivoro, herbivoro ou omnivoro): ");
        const abrigoCriaturas = [
            new CyberPet(1, nomeCyber, habitatMarte.id, bateria),
            new OrganicPet(2, nomeOrganic, habitatMarte.id, dieta)
        ];
        console.log("\n--- EXIBINDO MAPA DE CRIATURAS ---");
        abrigoCriaturas.forEach(criatura => criatura.exibir());
        console.log("\n--- TESTANDO VALIDAÇÕES ---");
        console.log("Tentando colocar bateria inválida...");
        abrigoCriaturas[0].nivelBateria = -10;

    } catch (error) {
        console.log(`\nSISTEMA BARRADO COM SUCESSO: ${error.message}`);
    } finally {
        rl.close();
    }
}

iniciar();