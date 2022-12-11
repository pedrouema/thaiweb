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
                    <td>{{ aluno.dataNasc_aluno }}</td>
                    <td>{{ "'Individual 2x'" }}</td>
                    <td>{{ "'Terça e Quinta 18:00'" }}</td>
                    <td>{{ aluno.diaPag_aluno }}</td>
                    <td>
                        <button type="button" class="btn btn-success">
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
            alunos: [],
            URL: "http://localhost:4000/alunos"
        }
    },
    methods: {
        getAllAlunos() {
            axios.get(`${this.URL}`).then(response => {
                this.alunos = response.data
                console.log(this.alunos);
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteAluno(id) {
            axios.delete(this.URL+"/delete/"+id).then(()=>{
                this.getAllAlunos()
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