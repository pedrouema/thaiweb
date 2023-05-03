<template>
    <h2 class="titulo">Relatório de planos cadastrados</h2>
    <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome do Plano</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valor do Plano</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="plano in planos" :key="plano.id_plano">
                    <th scope="row">{{ plano.nome_plano }}</th>
                    <td>{{ plano.tipo_plano }}</td>
                    <td>R$ {{ plano.valor_plano.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
</template>

<script>
import axios from 'axios'

export default{
    name: 'RelatorioPlanos',
    data(){
        return {
            URL: "http://localhost:4000",
            planos: [],
        }
    },
    methods: {
        getAllPlanos() {
            axios.get(`${this.URL}/planos`).then(response => {
                this.planos = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    mounted(){
        this.getAllPlanos();
    }
}
</script>

<style>
    .titulo {
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>


