class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintos = [
            { nome: 'Recinto 1', habitat: 'Bioma: savana', espacoLivre: 7, total: 10 },
            { nome: 'Recinto 2', habitat: 'Bioma: floresta', espacoLivre: 5, total: 5 },
            { nome: 'Recinto 3', habitat: 'Bioma: savana e rio', espacoLivre: 5, total: 7},
            { nome: 'Recinto 4', habitat: 'Bioma: rio', espacoLivre: 8, total: 8 },
            { nome: 'Recinto 5', habitat: ' Bioma: savana', espacoLivre: 6, total: 9 }
        ];

        const animaisValidos = ['LEÃO', 'LEOPARDO', 'CROCODILO', 'MACACO', 'GAZELA', 'HIPOPOTAMO'];

        // Transforma o nome do animal em maiúsculas para a verificação
        if (!animaisValidos.includes(animal.toUpperCase())) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        const recintosViaveis = recintos.filter(recinto => recinto.espacoLivre >= quantidade);

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        return { erro: false, recintosViaveis: recintosViaveis.map(recinto => `${recinto.nome} (espaço livre: ${recinto.espacoLivre} total: ${recinto.total})`) };

        /* A propriedade recintosViaveis é definida como um novo array, onde cada 
        elemento é uma string formatada com o nome do recinto, o espaço livre e o 
        total de espaço. */
    }

}

export { RecintosZoo as RecintosZoo };
