class RecintosZoo {

    constructor() {
        this.recintos = [
            { nome: 'Recinto 1 |', habitat: 'Bioma: savana', espacoLivre: 7, total: 10, animaisAtuais: ['MACACO'] },
            { nome: 'Recinto 2 |', habitat: 'Bioma: floresta', espacoLivre: 5, total: 5, animaisAtuais: [] },
            { nome: 'Recinto 3 |', habitat: 'Bioma,: savana e rio', espacoLivre: 5, total: 7, animaisAtuais: ['GAZELA'] },
            { nome: 'Recinto 4 |', habitat: 'Bioma: rio', espacoLivre: 8, total: 8, animaisAtuais: [] },
            { nome: 'Recinto 5 |', habitat: 'Bioma: savana', espacoLivre: 6, total: 9, animaisAtuais: ['LEÃO'] }
        ];
    }

    analisaRecintos(animal, quantidade) {
        const animaisValidos = ['LEÃO', 'LEOPARDO', 'CROCODILO', 'MACACO', 'GAZELA', 'HIPOPOTAMO'];
        const animaisCarnivoros = ['LEÃO', 'LEOPARDO', 'CROCODILO'];

        const espacosPorAnimal = {
            LEÃO: 3,
            LEOPARDO: 2,
            CROCODILO: 3,
            MACACO: 1,
            GAZELA: 2,
            HIPOPOTAMO: 4
        };

        const habitatPorAnimal = {
            LEÃO: ['savana'],
            LEOPARDO: ['savana'],
            CROCODILO: ['rio'],
            MACACO: ['savana', 'floresta'],
            GAZELA: ['savana'],
            HIPOPOTAMO: ['savana', 'rio']
        };

        const animalUpper = animal.toUpperCase();
        if (!animaisValidos.includes(animalUpper)) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        const espacoNecessario = espacosPorAnimal[animalUpper] * quantidade;
        const habitatsNecessarios = habitatPorAnimal[animalUpper];

        let recintosViaveis = this.recintos.filter(recinto => 
            recinto.espacoLivre >= espacoNecessario && 
            habitatsNecessarios.some(habitat => recinto.habitat.toLowerCase().includes(habitat))
        );

        if (animaisCarnivoros.includes(animalUpper)) {
            recintosViaveis = recintosViaveis.filter(recinto => 
                recinto.animaisAtuais.length === 0 || 
                recinto.animaisAtuais.every(a => a === animalUpper)
            );
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        return { 
            erro: false, 
            recintosViaveis: recintosViaveis.map(recinto => 
                `${recinto.nome} ${recinto.habitat} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`
            ) 
        };
    }

    inserirAnimais(recintoIndex, animal, quantidade) {
        const recinto = this.recintos[recintoIndex];

        if (!recinto) {
            return "Recinto não encontrado";
        }

        const animaisValidos = ['LEÃO', 'LEOPARDO', 'CROCODILO', 'MACACO', 'GAZELA', 'HIPOPOTAMO'];
        const espacosPorAnimal = {
            LEÃO: 3,
            LEOPARDO: 2,
            CROCODILO: 3,
            MACACO: 1,
            GAZELA: 2,
            HIPOPOTAMO: 4
        };

        const animalUpper = animal.toUpperCase();
        if (!animaisValidos.includes(animalUpper)) {
            return "Animal inválido";
        }

        const espacoNecessario = espacosPorAnimal[animalUpper] * quantidade;
        if (recinto.espacoLivre < espacoNecessario) {
            return "Espaço insuficiente no recinto";
        }

        recinto.animaisAtuais.push(...Array(quantidade).fill(animalUpper));
        recinto.espacoLivre -= espacoNecessario;

        return "Animais inseridos com sucesso";
    }
}

export { RecintosZoo as RecintosZoo };
