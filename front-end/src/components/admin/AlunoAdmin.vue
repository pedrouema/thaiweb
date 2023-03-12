<template>
    <div class="aluno-admin">
        <h3>Gerenciamento de Alunos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Aluno</label>
                <input type="text" class="form-control" placeholder="Nome do Aluno" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Aluno</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10" v-model="cpf" v-mask="'###.###.###-##'">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Nascimento</label >
                <input type="date" class="form-control" id="inputZip" v-model="dataNasc">
            </div>
            <div class="col-md-4" >
                <label for="inputState" class="form-label">Plano</label>
                <select class="form-select" v-model="plano">
                    <option value="">Selecione o Plano</option>
                    <option v-for="plano in planos" :key="plano.id_plano" v-bind:value="plano.id_plano">
                        {{ plano.nome_plano }}
                    </option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Turma</label>
                <select id="inputState" class="form-select" v-model="turma">
                    <option value="">Selecione a Turma</option>
                    <option v-for="turma in turmas" :key="turma.id_turma" v-bind:value="turma.id_turma">
                        {{ turma.nome_turma }}
                    </option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Dia Limite de Pagamento</label>
                <select class="form-select" v-model="diaPag">
                    <option value="5">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createAluno()" v-show="!editar">+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data Nascimento</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Dia Pagamento</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="aluno in alunos" :key="aluno.id_aluno">
                    <th scope="row">{{ aluno.id_aluno }}</th>
                    <td>{{ aluno.nome_aluno }}</td>
                    <td>{{ aluno.cpf_aluno }}</td>
                    <td>{{ aluno.datanasc_aluno }}</td>
                    <td>{{ aluno.nome_plano }}</td>
                    <td>{{ aluno.nome_turma }}</td>
                    <td>{{ aluno.diapag_aluno }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosAluno(aluno.id_aluno)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteAluno(aluno.id_aluno)">
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
    name: 'AlunoAdmin',
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
            planos: [],
            turmas: [],
            alunoId: 0,
            nome: '',
            cpf: '',
            dataNasc: '',
            plano: 0,
            turma: 0,
            diaPag: 0,
            editar: false
        }
    },
    methods: {
        getAllAlunos() {
            axios.get(`${this.URL}/alunos`).then(response => {
                this.alunos = response.data
                console.log(this.alunos);
            })
        },
        createAluno() {
            const aluno = {
                nome_aluno: this.nome,
                cpf_aluno: this.cpf,
                datanasc_aluno: this.dataNasc,
                id_plano: this.plano,
                id_turma: this.turma,
                diapag_aluno: this.diaPag,
            }
            console.log(aluno);
            axios.post(`${this.URL}/alunos`, aluno).then(response => {
                console.log(response);
                this.getAllAlunos();
            });
            this.limpaDadosFormulario();
        },
        carregarDadosAluno(id){
            this.editar = true;
            axios.get(`${this.URL}/alunos/getone/`+id).then(response => {
                const aluno = response.data[0]
                this.alunoId = aluno.id_aluno
                this.nome = aluno.nome_aluno
                this.cpf = aluno.cpf_aluno
                this.dataNasc = aluno.datanasc_formatada
                this.plano = aluno.id_plano
                this.turma = aluno.id_turma
                this.diaPag = aluno.diapag_aluno
                console.log(response.data[0]);
            })
        },
        salvarDados(){
            const aluno = {
                nome_aluno: this.nome,
                cpf_aluno: this.cpf,
                datanasc_aluno: this.dataNasc,
                id_plano: this.plano,
                id_turma: this.turma,
                diapag_aluno: this.diaPag,
            }
            console.log(aluno);
            axios.put(`${this.URL}/alunos/${this.alunoId}`, aluno).then(response => {
                console.log(response);
                this.getAllAlunos();
            });
            this.limpaDadosFormulario();
        },
        deleteAluno(id) {
            axios.delete(this.URL+"/alunos/delete/"+id).then(()=>{
                this.getAllAlunos()
            })
        },
        getAllPlanosOptions() {
            axios.get(`${this.URL}/planos/options`).then(response => {
                this.planos = response.data
                console.log(this.planos);
            })
        },
        getAllTurmasOptions() {
            axios.get(`${this.URL}/turmas/options`).then(response => {
                this.turmas = response.data
                console.log(this.turmas);
            })
        },
        limpaDadosFormulario(){
            this.alunoId = 0;
            this.nome = '';
            this.cpf = '';
            this.dataNasc = '';
            this.plano = 0;
            this.turma = 0;
            this.diaPag = 0;
            this.editar = false;
        },
        isCPF(cpf){
            cpf = cpf.replace(/\.|-/g,"");
            soma = 0
            console.log(cpf);
            return true
        },
        
    },
    mounted() {
        this.getAllAlunos();
        this.getAllPlanosOptions();
        this.getAllTurmasOptions();
    }
}
</script>

<style>

</style>