<template>
    <div class="aluno-admin">
        <h3>Gerenciamento de Alunos</h3>
        <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
            <i class="fa fa-question-circle"></i>
        </button>
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
                <label for="inputZip" class="form-label">Data de inicio</label >
                <input type="date" class="form-control" id="inputZip" v-model="diaPag">
            </div>
            <div class="col-12">
                <button type="button" id="button" class="btn btn-primary" @click="createAluno()" v-show="!editar">+ SALVAR</button>
                <button type="button" id="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <hr>
        <div class="alunos-table">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-dark" type="button" v-on:click.prevent="abrirRelatorio()"><i class="fa fa-print"> </i> Imprimir</button>
            </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data Nascimento</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Data Inicio</th>
                    <th scope="col">Ações</th>
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
                    <td>
                        <button type="button" id="btnAcoes" class="btn btn-success" @click="carregarDadosAluno(aluno.id_aluno)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button"  id="btnAcoes" class="btn btn-danger" @click="deleteAluno(aluno.id_aluno)">
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
// import RelatorioAlunos from '@/components/admin/RelatorioAlunos'

export default {
    name: 'AlunoAdmin',
    // components: { RelatorioAlunos },
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
            planos: [],
            turmas: [],
            alunoId: 0,
            nome: '',
            cpf: '',
            cpfFormatado: 0,
            dataNasc: '',
            plano: 0,
            turma: 0,
            diaPag: '',
            editar: false
        }
    },
    methods: {
        abrirRelatorio(){
            const win = window.open('http://localhost:8080/relatorioalunos')
            win.focus()
        },
        getAllAlunos() {
            axios.get(`${this.URL}/alunos`).then(response => {
                this.alunos = response.data
            })
        },
        createAluno() {
            this.formatarCPF()
            if(this.validarCpf(this.cpfFormatado))
            {
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
                    this.getAllAlunos();
                });
                this.limpaDadosFormulario();
            }
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
                this.diaPag = aluno.diapag_formatada
            })
        },
        salvarDados(){
            this.formatarCPF()
            if(this.validarCpf(this.cpfFormatado))
            {
                const aluno = {
                    nome_aluno: this.nome,
                    cpf_aluno: this.cpf,
                    datanasc_aluno: this.dataNasc,
                    id_plano: this.plano,
                    id_turma: this.turma,
                    diapag_aluno: this.diaPag,
                }
                axios.put(`${this.URL}/alunos/${this.alunoId}`, aluno).then(response => {
                    this.getAllAlunos();
                });
                this.limpaDadosFormulario();
            }
        },
        deleteAluno(id) {
            const aluno = {
                    ativo_aluno: false
            }
            axios.put(`${this.URL}/alunos/delete/${id}`, aluno).then(response => {
                this.getAllAlunos();
            });
            // axios.delete(this.URL+"/alunos/delete/"+id).then(()=>{
            //     this.getAllAlunos()
            // })
        },
        getAllPlanosOptions() {
            axios.get(`${this.URL}/planos/options`).then(response => {
                this.planos = response.data
            })
        },
        getAllTurmasOptions() {
            axios.get(`${this.URL}/turmas/options`).then(response => {
                this.turmas = response.data
            })
        },
        limpaDadosFormulario(){
            this.alunoId = 0;
            this.nome = '';
            this.cpf = '';
            this.dataNasc = '';
            this.plano = 0;
            this.turma = 0;
            this.diaPag = '';
            this.editar = false;
        },
        validarPrimeiroDigito(cpf) {
            let sum = 0;
            for (let i = 0; i < 9; i++) {
                sum += cpf[i] * (10 - i);
            }
            const resto = (sum * 10) % 11;
            if (resto < 10) {
                return cpf[9] == resto;
            }
            return cpf[9] == 0;
        },
        validarSegundoDigito(cpf) {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += cpf[i] * (11 - i);
        }
        const resto = (sum * 10) % 11;
        if (resto < 10) {
            return cpf[10] == resto;
        }
        return cpf[10] == 0;
        },
        validarRepetido(cpf) {
            const primeiro = cpf[0];
            let diferente = false;
            for(let i = 1; i < cpf.length; i++) {
                if(cpf[i] != primeiro) {
                diferente = true;
                }
            }
            return diferente;
        },
        validarCpf(cpf) {
            if (cpf.length != 11) {
                return false;
            }
            if(!this.validarRepetido(cpf)) {
                return false;
            }
            if (!this.validarPrimeiroDigito(cpf)) {
                return false;
            }
            if (!this.validarSegundoDigito(cpf)) {
                return false;
            }
            return true;
        },
        formatarCPF(){
            this.cpfFormatado = this.cpf.replace("-", "").replace(".", "").replace(".", "")
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Gerenciamento de aluno</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#4da6ff">Cadastrar novo aluno</h3>'+
                    '<b>IMPORTANTE </b><p>Plano e Turma devem estar previamente cadastrados.</p>' +
                    '<p><b>1- </b>Inserir todos os dados: nome do aluno, cpf(válido) do aluno, data de nascimento, '+
                    'selecionar um plano, selecionar uma turma e data ne inicio.'+
                    '<p><b>2- </b>Após todos dados inseridos clicar no botão "+SALVAR" para salvar cadastro ou "CANCELAR" '+
                    'para limpar formulário.'+
                    '<h3 style="color:#39ac6b">Editar um aluno</h3>'+
                    '<p><b>1- </b>Na lista abaixo do formulário clicar no botão "Editar" na mesma linha correspondente '+
                    'ao aluno que deseja alterar o(s) dado(s).'+
                    '<p><b>2- </b>Após clicar no botão "Editar" os dados do respectivo aluno irá carregar no formulário acima, '+
                    'após isso pode alterar o(s) dado(s) que deseja do mesmo.'+
                    '<p><b>3- </b>Após editar, para salvar a(s) alteração(ôs) clicar no botão "+EDITAR" (azul) ou "CANCELAR" (vermelho) para cancelar alteração(ôs).'+
                    '<h3 style="color:#ff6666">Excluir um aluno</h3>'+
                    '<p><b>1- </b>Na lista abaixo do formulário, clicar no botão "Excluir" na mesma linha correspondente '+
                    'ao aluno que deseja fazer a exclusão.'+
                    '<p><b>2- </b>Após clicar no botão "Excluir" o aluno será excluido permanentemente. Para recuperar o mesmo, deve ser '+
                    'feito o passo a passo de "Cadastrar novo aluno".'
            })
        }
    },
    mounted() {
        this.getAllAlunos();
        this.getAllPlanosOptions();
        this.getAllTurmasOptions();
    }
}
</script>

<style>
    #btnAjuda{
        float: right;
        border-radius: 50%;
    }
    #button{
        margin-right: 10px;
    }
    #btnAcoes{
        width:100px;
        height:40px;
        margin-right: 10px;
    }
</style>