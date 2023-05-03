<template>
    <div>
        <h2 class="titulo">Relatório de turmas cadastradas</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome da Turma</th>
                    <th scope="col">Horario</th>
                    <th scope="col">Dia(s)</th>
                    <th scope="col">Instrutor</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="turma in turmas" :key="turma.id_turma">
                    <th scope="row">{{ turma.nome_turma+' '+turma.qtdesemanal_turma+'x' }}</th>
                    <td>{{ turma.horario_turma }}</td>
                    <td>{{ turma.dias_turma }}</td>
                    <td>{{ turma.nome_instrutor }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'RelatorioTurmas',
    data(){
        return {
            URL: "http://localhost:4000",
            turmas: [],
        }
    },
    methods:{
        getAllTurmas() {
            axios.get(`${this.URL}/turmas`).then(response => {
                this.turmas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    mounted(){
        this.getAllTurmas();
    },
}
</script>

<style>
    .titulo {
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>