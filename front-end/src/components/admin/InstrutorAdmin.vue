<template>
    <div class="instrutor-admin">
        <h3>Gerenciamento de Instrutores</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Instrutor</label>
                <input type="text" class="form-control" placeholder="Nome do Instrutor" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Instrutor</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10" v-model="cpf" v-mask="'###.###.###-##'">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createInstrutor()" v-show="!editar">+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <hr/>
    <div class="administradores-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="instrutor in instrutores" :key="instrutor.id_instrutor">
                    <th scope="row">{{ instrutor.id_instrutor }}</th>
                    <td>{{ instrutor.nome_instrutor }}</td>
                    <td>{{ instrutor.cpf_instrutor }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosInstrutor(instrutor.id_instrutor)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteInstrutor(instrutor.id_instrutor)">
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
            editar: false,
        }
    },
    methods: {
        getAllInstrutores() {
            axios.get(`${this.URL}/instrutores`).then(response => {
                this.instrutores = response.data
                console.log(this.instrutores);
            })
            .catch(error => {
                console.log(error);
            })
        },
        createInstrutor(){
            const instrutor = {
                nome_instrutor: this.nome,
                cpf_instrutor: this.cpf,
                
            }
            console.log(instrutor);
            axios.post(`${this.URL}/instrutores`, instrutor).then(response => {
                console.log(response);
                this.getAllInstrutores();
            })
            this.limpaDadosFormulario()
        },
        carregarDadosInstrutor(id){
            this.editar = true;
            axios.get(`${this.URL}/instrutores/getone/`+id).then(response => {
                const instrutor = response.data[0]
                this.instrutorId = instrutor.id_instrutor
                this.nome = instrutor.nome_instrutor
                this.cpf = instrutor.cpf_instrutor
                console.log(response.data[0]);
            })
        },
        salvarDados(){
            const instrutor = {
                nome_instrutor: this.nome,
                cpf_instrutor: this.cpf,
            }
            console.log(instrutor);
            axios.put(`${this.URL}/instrutores/${this.instrutorId}`, instrutor).then(response => {
                console.log(response);
                this.getAllInstrutores();
            });
            this.limpaDadosFormulario();
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
    },
    mounted() {
        this.getAllInstrutores();
    }
}
</script>

<style>

</style>