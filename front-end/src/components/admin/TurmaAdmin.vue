<template>
    <div class="turma-admin">
        <h3>Gerênciamento de Turma</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Turma</label>
                <input type="text" class="form-control" placeholder="exemplo: Turma 18:00" v-model="nome">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Instrutor</label>
                <select class="form-select" v-model="instrutor">
                    <option value="">Selecione o Instrutor</option>
                    <option v-for="instrutor in instrutores" :key="instrutor.id_instrutor" v-bind:value="instrutor.id_instrutor">
                        {{ instrutor.nome_instrutor }}
                    </option>
                </select>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createTurma()" v-show="!editar" >+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <hr/>
    <div class="turma-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome da Turma</th>
                    <th scope="col">Instrutor</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="turma in turmas" :key="turma.id_turma">
                    <th scope="row">{{ turma.id_turma }}</th>
                    <td>{{ turma.nome_turma }}</td>
                    <td>{{ turma.nome_instrutor }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosTurma(turma.id_turma)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteTurma(turma.id_turma)">
                            <i class="fa fa-trash"> </i>
                             Excluir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'TurmaAdmin',
    data(){
        return {
            URL: "http://localhost:4000",
            instrutores:[],
            turmas: [],
            turmaId: 0,
            nome: '',
            instrutorId: 0,
            instrutor: 0,
            editar: false
        }
    },
    methods: {
        getAllTurmas() {
            axios.get(`${this.URL}/turmas`).then(response => {
                this.turmas = response.data
                console.log(this.turmas);
            })
            .catch(error => {
                console.log(error);
            })
        },
        createTurma() {
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor
            }
            console.log(turma);
            axios.post(`${this.URL}/turmas`, turma).then(response => {
                console.log(response);
                this.getAllTurmas();
            });
            this.limpaDadosFormulario();
        },
        carregarDadosTurma(id){
            this.editar = true;
            axios.get(`${this.URL}/turmas/getone/`+id).then(response => {
                const turma = response.data[0]
                this.turmaId = turma.id_turma
                this.nome = turma.nome_turma
                this.instrutor = turma.id_instrutor
                console.log(response.data[0]);
            })
        },
        salvarDados(){
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor
            }
            console.log(turma);
            axios.put(`${this.URL}/turmas/${this.turmaId}`, turma).then(response => {
                console.log(response);
                this.getAllTurmas();
            });
            this.limpaDadosFormulario();
        },
        deleteTurma(id) {
            axios.delete(this.URL+"/turmas/delete/"+id).then(()=>{
                this.getAllTurmas()
            });
        },
        getAllInstrutoresOptions() {
            axios.get(`${this.URL}/instrutores/options`).then(response => {
                this.instrutores = response.data
                console.log(this.instrutores);
            })
        },
        limpaDadosFormulario(){
            this.turmaId = 0;
            this.nome = '';
            this.instrutorId = 0;
            this.instrutor = 0;
            this.editar = false;
        }
    },
    mounted() {
        this.getAllTurmas();
        this.getAllInstrutoresOptions();
    }
}
</script>

<style>

</style>