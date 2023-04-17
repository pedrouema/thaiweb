<template>
    <div class="cronograma-page">
        <PageTitle icon="fa fa-calendar" main="Cronograma"
            sub="Cronograma Semanal" />
        
        <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="card" style="background-color:orange;">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center; text-;">Segunda-Feira</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasSeg" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card" style="background-color:royalblue">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center;">Terça-Feira</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasTer" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card" style="background-color:orange">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center;">Quarta-Feira</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasQua" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card" style="background-color:royalblue;">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center;">Quinta-Feira</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasQui" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card" style="background-color:orange">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center;">Sexta-Feira</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasSex" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card" style="background-color:royalblue;">
                            <div class="card-body">
                                <h4 class="card-title" style="text-align: center;">Sábado</h4>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Horario</th>
                                            <th scope="col">Turma</th>
                                        </tr>
                                    </thead>
                                    <tbody class="table-group-divider">
                                        <tr v-for="turma in turmasSab" :key="turma.id_turma">
                                            <th scope="row">{{ turma.horario_turma }}</th>
                                            <td>{{ turma.nome_turma+', '+turma.qtdesemanal_turma+'x'}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import PageTitle from '../template/PageTitle'

    export default{
        name: 'CronogramaPage',
        components: { PageTitle },
        data(){
            return {
                URL: "http://localhost:4000",
                turmasSeg: [], 
                turmasTer: [], 
                turmasQua: [],
                turmasQui: [],
                turmasSex: [],
                turmasSab: [],
                seg: false,
            }
        },
        methods: {
            getTurmasSegunda(){
                axios.get(`${this.URL}/cronogramasegunda`).then(response => {
                this.turmasSeg = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getTurmasTerca(){
                axios.get(`${this.URL}/cronogramaterca`).then(response => {
                this.turmasTer = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getTurmasQuarta(){
                axios.get(`${this.URL}/cronogramaquarta`).then(response => {
                this.turmasQua = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getTurmasQuinta(){
                axios.get(`${this.URL}/cronogramaquinta`).then(response => {
                this.turmasQui = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getTurmasSexta(){
                axios.get(`${this.URL}/cronogramasexta`).then(response => {
                this.turmasSex = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
            getTurmasSabado(){
                axios.get(`${this.URL}/cronogramasabado`).then(response => {
                this.turmasSab = response.data
                })
                .catch(error => {
                    console.log(error);
                })
            },
        },
        mounted() {
            this.getTurmasSegunda();
            this.getTurmasTerca();
            this.getTurmasQuarta();
            this.getTurmasQuinta();
            this.getTurmasSexta();
            this.getTurmasSabado();
        }
    }
</script>

<style>
    table, th, td {
    border: 1px solid;
    }

    body {
		margin:auto;
	}

</style>