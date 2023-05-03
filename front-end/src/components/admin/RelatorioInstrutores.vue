<template>
    <div>
        <h2 class="titulo">Relatório de instrutores cadastrados</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="instrutor in instrutores" :key="instrutor.id_instrutor">
                    <th scope="row">{{ instrutor.nome_instrutor }}</th>
                    <td>{{ instrutor.cpf_instrutor }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>

<script>
import axios from 'axios'

export default{
    name: 'RelatorioInstrutores',
    data(){
        return {
            URL: "http://localhost:4000",
            instrutores: [],
        }
    },
    methods: {
        getAllInstrutores() {
            axios.get(`${this.URL}/instrutores`).then(response => {
                this.instrutores = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    mounted(){
        this.getAllInstrutores();
    },
}
</script>

<style>
    .titulo {
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>