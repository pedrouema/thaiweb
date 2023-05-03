<template>
    <div>
        <h2 class="titulo">Relatório de alunos cadastrados</h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data Nascimento</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Data Inicio</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="aluno in alunos" :key="aluno.id_aluno">
                    <th scope="row">{{ aluno.nome_aluno }}</th>
                    <td>{{ aluno.cpf_aluno }}</td>
                    <td>{{ aluno.datanasc_aluno }}</td>
                    <td>{{ aluno.nome_plano }}</td>
                    <td>{{ aluno.nome_turma }}</td>
                    <td>{{ aluno.diapag_aluno }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>

<script>
import axios from 'axios'

export default{
    name: 'RelatorioAlunos',
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
        }
    },
    methods: {
        getAllAlunos() {
            axios.get(`${this.URL}/alunos`).then(response => {
                this.alunos = response.data
            })
        },
    },
    mounted(){
        this.getAllAlunos();
    },
}
</script>

<style>
    .titulo {
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>