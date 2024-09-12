import { RecintosZoo } from './recintos-zoo.js';
import readline from 'readline';

const zoo = new RecintosZoo();

console.log('-----------------------------------------------------------')
console.log('|        Sistema de Controle de  Zoológicos da DB!        |')
console.log('-----------------------------------------------------------\n')

console.log('___________________________________________')
console.log("| Aba atual: Recintos viáveis para animais|")
console.log('-------------------------------------------')

console.log("Animais disponíveis: LEÃO, LEOPARDO, CROCODILO, MACACO, GAZELA, HIPOPOTAMO");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function perguntarAnimal() {
    rl.question('\nEntre com o nome do animal: ', (nomeAnimal) => {
        rl.question('Entre com a quantidade de animais: ', (quantidade) => {
            const resultado = zoo.analisaRecintos(nomeAnimal.toUpperCase(), parseInt(quantidade, 10));

            if (resultado.erro) {
                console.log(resultado.erro);
            } else {
                console.log('Recintos viáveis:', resultado.recintosViaveis);
                // q: como fazer para que o usuário possa escolher um recinto e inserir o animal nele?
            }

            console.log

            rl.question('Deseja continuar? (s/n): ', (resposta) => {
                if (resposta.toLowerCase() === 's') {
                    perguntarAnimal();
                } else {
                    rl.close();
                }
            });
        });
    });
}

perguntarAnimal();

// const resultado = zoo.analisaRecintos("MACACO", 2);
