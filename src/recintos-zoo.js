class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintos = [
            { nome: 'Recinto 1 |', habitat: 'Bioma: savana', espacoLivre: 7, total: 10 },
            { nome: 'Recinto 2 |', habitat: 'Bioma: floresta', espacoLivre: 5, total: 5 },
            { nome: 'Recinto 3 |', habitat: 'Bioma: savana e rio', espacoLivre: 5, total: 7},
            { nome: 'Recinto 4 |', habitat: 'Bioma: rio', espacoLivre: 8, total: 8 },
            { nome: 'Recinto 5 |', habitat: 'Bioma: savana', espacoLivre: 6, total: 9 }
        ];

        const animaisValidos = ['LEÃO', 'LEOPARDO', 'CROCODILO', 'MACACO', 'GAZELA', 'HIPOPOTAMO'];

        const espacosPorAnimal = {
            LEÃO: 3,
            LEOPARDO: 2,
            CROCODILO: 3,
            MACACO: 1,
            GAZELA: 2,
            HIPOPÓTAMO: 4
        };

        const habitatPorAnimal = {
            LEÃO: ['savana'],
            LEOPARDO: ['savana'],
            CROCODILO: ['rio'],
            MACACO: ['savana', 'floresta'],
            GAZELA: ['savana'],
            HIPOPÓTAMO: ['savana', 'rio']
        };

        // Transforma o nome do animal em maiúsculas para a verificação
        const animalUpper = animal.toUpperCase();
        if (!animaisValidos.includes(animalUpper)) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        // Verifica se a quantidade é menor que 0 ou se não é um número inteiro, se não for, retorna um erro
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        const espacoNecessario = espacosPorAnimal[animalUpper] * quantidade;
        const habitatsNecessarios = habitatPorAnimal[animalUpper];

        // Filtra os recintos que possuem espaço livre maior ou igual a quantidade de animais
        const recintosViaveis = recintos.filter(recinto => recinto.espacoLivre >= espacoNecessario && 
        habitatsNecessarios.some(habitat => recinto.habitat.toLowerCase().includes(habitat)));

        // Se não houver recintos viáveis, retorna um erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        /* A propriedade recintosViaveis é definida como um novo array, onde cada elemento é uma string formatada com o nome do recinto, o 
        espaço livre e o total de espaço. */
        return { erro: false, recintosViaveis: recintosViaveis.map(recinto => `${recinto.nome} ${recinto.habitat} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`) };
    }

}
export { RecintosZoo as RecintosZoo };
