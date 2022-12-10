<template>
    <div class="aluno-admin">
        <h3>Gerênciamento de Alunos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Aluno</label>
                <input type="text" class="form-control" placeholder="Nome do Aluno">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Aluno</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="inputZip">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Plano</label>
                <select id="inputState" class="form-select">
                    <option selected>Individual 3x</option>
                    <option>Turma 3x</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Turma</label>
                <select id="inputState" class="form-select">
                    <option selected>Individual 18:00</option>
                    <option>Individual 10:00</option>
                    <option>Turma 10:00</option>
                    <option>Turma 18:00</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Dia Limite de Pagamento</label>
                <input type="number" class="form-control" id="inputZip" placeholder="15">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
    <hr/>
    <div v-for="aluno in alunos" :key="aluno.id_aluno">
        <AlunosTable :id_aluno="aluno.id_aluno" :nome_aluno="aluno.nome_aluno" :cpf_aluno="aluno.cpf_aluno"
                     :dataNasc_aluno="aluno.dataNasc_aluno" :plano_aluno="'Individual 2x'" 
                     :turma_aluno="'Terça e Quinta 18:00'" :diaPag_aluno="12"/> 
    </div>
</template>

<script>
import AlunosTable from './AlunosTable.vue';
//import {  baseApiUrl } from '@/global'
import axios from 'axios'
import { response } from 'express';


export default {
    name: 'AlunoAdmin',
    components: { AlunosTable },
    data(){
        return {
            alunos: [],

        }
    },
    methods: {
        getAllAlunos() {
            const url = 'http://localhost:4000/alunos'
            axios.get(url).then(response => {
                this.aluno = response.data
                console.log(this.alunos);
            })
            .catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        this.getAllAlunos();
    }
}
</script>

<style>

</style>