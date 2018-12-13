<template>
    <div id="app">
        <label>
            Search Medicamentos
            <input v-model="query"/>
        </label>
        <table style="width: 100%">
            <thead>
                <th>Nome</th>
                <th>Situação</th>
                <th>Preço</th>
                <th>Tipo</th>
            </thead>
            <tbody>
                <tr v-for="result of queryResults">
                    <td>{{result.nome}}</td>
                    <td>{{result.situacao}}</td>
                    <td>{{result.preco}}</td>
                    <td>{{result.tipo}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fz from 'fuzzaldrin-plus';
import Prods from './prod.json';

export default {
    name: 'Search',
    data: function() {
        return {
            query: '',
            options: Prods
        }
    },
    computed: {
        queryResults() {
            if(!this.query) return this.options;
            const preparedQuery = fz.prepareQuery(this.query);
            const scores = {};

            return this.options
                .map((option, index) => {
                    const scorableFields = [
                        option.nome,
                        option.situacao,
                        option.tem,
                        `${option.tipo}`
                    ].map(toScore => fz.score(toScore, this.query, { preparedQuery }));
                    scores[option.nome] = Math.max(...scorableFields);
                    return option;
                })
                .filter(option => scores[option.nome] > 1)
                .sort((a, b) => scores[b.nome] - scores[a.nome]);
        }
    }
}
</script>

<style>

</style>
