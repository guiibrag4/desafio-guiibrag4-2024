import { RecintosZoo } from './recintos-zoo.js';
import readline from 'readline';

const zoo = new RecintosZoo();

console.log('-----------------------------------------------------------');
console.log('|        Sistema de Controle de Zoológicos da DB!         |');
console.log('-----------------------------------------------------------\n');

console.log('___________________________________________');
console.log("| Aba atual: Recintos viáveis para animais|");
console.log('-------------------------------------------');

console.log("Animais disponíveis: LEÃO, LEOPARDO, CROCODILO, MACACO, GAZELA, HIPOPOTAMO");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function perguntarAnimal() {
    rl.question('\nEntre com o nome do animal e a quantidade (ex: LEÃO, 2): ', (entrada) => {
        const [nomeAnimal, quantidade] = entrada.split(',').map(str => str.trim());

        if (!nomeAnimal || isNaN(quantidade)) {
            console.log("Entrada inválida. Certifique-se de fornecer um nome de animal válido e uma quantidade numérica.\n");
            return perguntarAnimal(); // Repetir pergunta em caso de entrada inválida
        }

        const resultado = zoo.analisaRecintos(nomeAnimal.toUpperCase(), parseInt(quantidade, 10));

        if (resultado.erro) {
            console.log(resultado.erro);
            return perguntarAnimal(); // Repetir se houver erro
        } else {
            console.log('\nRecintos viáveis:');
            resultado.recintosViaveis.forEach((recinto, index) => {
                console.log(`Digite ${index + 1} para escolher ->  ${recinto}`);
            });

            perguntarRecinto(resultado.recintosViaveis, nomeAnimal.toUpperCase(), parseInt(quantidade, 10));
        }
    });
}

function perguntarRecinto(recintosViaveis, nomeAnimal, quantidade) {
    rl.question('\nEscolha o recinto para inserir os animais (digite o número): ', (numeroRecinto) => {
        const recintoIndex = parseInt(numeroRecinto) - 1;

        if (isNaN(recintoIndex) || recintoIndex < 0 || recintoIndex >= recintosViaveis.length) {
            console.log("O recinto não existe ou não é viável.");
            return perguntarRecinto(recintosViaveis, nomeAnimal, quantidade); // Repetir pergunta em caso de recinto inválido
        }

        const resultadoInsercao = zoo.inserirAnimais(recintoIndex, nomeAnimal, quantidade);
        console.log(resultadoInsercao);

        perguntarContinuar(); 
    });
}

function perguntarContinuar() {
    rl.question('Deseja continuar? (s/n): ', (resposta) => {
        const respostaFormatada = resposta.toLowerCase().trim();
        
        if (respostaFormatada === 's') {
            perguntarAnimal();
        } else if (respostaFormatada === 'n') {
            rl.close();
        } else {
            console.log("Caractere inválido, tente novamente.\n");
            perguntarContinuar(); // Repete a pergunta em caso de resposta inválida
        }
    });
}

perguntarAnimal();
