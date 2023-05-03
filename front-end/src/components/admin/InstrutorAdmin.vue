<template>
    <div class="instrutor-admin">
        <h3>Gerenciamento de Instrutores</h3>
        <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
            <i class="fa fa-question-circle"></i>
        </button>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Instrutor</label>
                <input type="text" class="form-control" placeholder="Nome do Instrutor" v-model="nome" >
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Instrutor</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10" v-model="cpf" v-mask="'###.###.###-##'">
            </div>
            <div class="col-12">
                <button type="button" id="button" class="btn btn-primary" @click="createInstrutor()" v-show="!editar">+ SALVAR</button>
                <button type="button" id="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <hr/>
    <div class="administradores-table">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-dark" type="button" v-on:click.prevent="abrirRelatorio()"><i class="fa fa-print"> </i> Imprimir</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="instrutor in instrutores" :key="instrutor.id_instrutor">
                    <th scope="row">{{ instrutor.nome_instrutor }}</th>
                    <td>{{ instrutor.cpf_instrutor }}</td>
                    <td>
                        <button type="button" id="btnAcoes" class="btn btn-success" @click="carregarDadosInstrutor(instrutor.id_instrutor)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" id="btnAcoes" class="btn btn-danger" @click="deleteInstrutor(instrutor.id_instrutor)">
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
import axios from 'axios';


export default {
    name: 'InstrutoresAdmin',
    data() {
        return{
            URL: "http://localhost:4000",
            instrutores: [],
            instrutorId: 0,
            nome: '',
            cpf: '',
            cpfFormatado: 0,
            editar: false,
        }
    },
    methods: {
        abrirRelatorio(){
            const win = window.open('http://localhost:8080/relatorioinstrutores')
            win.focus()
        },
        getAllInstrutores() {
            axios.get(`${this.URL}/instrutores`).then(response => {
                this.instrutores = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        createInstrutor(){
            this.formatarCPF()
            console.log(this.validarCpf(this.cpfFormatado));
            if(this.validarCpf(this.cpfFormatado))
            {
                const instrutor = {
                    nome_instrutor: this.nome,
                    cpf_instrutor: this.cpf,
                    
                }
                axios.post(`${this.URL}/instrutores`, instrutor).then(response => {
                    this.getAllInstrutores();
                })
                window.location.reload(true)
                this.limpaDadosFormulario()
            }
        },
        carregarDadosInstrutor(id){
            this.editar = true;
            axios.get(`${this.URL}/instrutores/getone/`+id).then(response => {
                const instrutor = response.data[0]
                this.instrutorId = instrutor.id_instrutor
                this.nome = instrutor.nome_instrutor
                this.cpf = instrutor.cpf_instrutor
            })
        },
        salvarDados(){
            this.formatarCPF()
            console.log(this.validarCpf(this.cpfFormatado));
            if(this.validarCpf(this.cpfFormatado))
            {
                const instrutor = {
                    nome_instrutor: this.nome,
                    cpf_instrutor: this.cpf,
                }
                console.log(instrutor);
                axios.put(`${this.URL}/instrutores/${this.instrutorId}`, instrutor).then(response => {
                    this.getAllInstrutores();
                });
                window.location.reload(true)
                this.limpaDadosFormulario();
            }
        },
        deleteInstrutor(id) {
            axios.delete(this.URL+"/instrutores/delete/"+id).then(()=>{
                this.getAllInstrutores()
            })
        },
        limpaDadosFormulario(){
            this.instrutorId = 0;
            this.nome = '';
            this.cpf = '';
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
            console.log(this.cpfFormatado);
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Gerenciamento de instrutores</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#4da6ff">Cadastrar novo instrutor</h3>'+
                    '<p><b>1- </b>Inserir todos os dados: nome do instrutor e CPF do instrutor.'+
                    '<p><b>2- </b>Após todos dados inseridos clicar no botão "+SALVAR" para salvar cadastro ou "CANCELAR" '+
                    'para limpar formulário.'+
                    '<h3 style="color:#39ac6b">Editar um instrutor</h3>'+
                    '<p><b>1- </b>Na lista abaixo do formulário clicar no botão "Editar" na mesma linha correspondente '+
                    'ao instrutor que deseja alterar o(s) dado(s).'+
                    '<p><b>2- </b>Após clicar no botão "Editar" os dados do respectivo instrutor irá carregar no formulário acima, '+
                    'após isso pode alterar o(s) dado(s) que deseja do mesmo.'+
                    '<p><b>3- </b>Após editar, para salvar a(s) alteração(ôs) clicar em "+SALVAR" ou "CANCELAR" para cancelar alteração(ôs).'+
                    '<h3 style="color:#ff6666">Excluir um instrutor</h3>'+
                    '<b>IMPORTANTE </b><p>Para excluir um instrutor, nenhuma turma deve estar usando o mesmo.</p>' +
                    '<p><b>1- </b>Na lista abaixo do formulário, clicar no botão "Excluir" na mesma linha correspondente '+
                    'ao instrutor que deseja fazer a exclusão.'+
                    '<p><b>2- </b>Após clicar no botão "Excluir" o instrutor será excluido permanentemente. Para recuperar o mesmo, deve ser '+
                    'feito o passo a passo de "Cadastrar novo instrutor".'
            })
        }
    },
    mounted() {
        this.getAllInstrutores();
    }
}
</script>

<style>

</style>