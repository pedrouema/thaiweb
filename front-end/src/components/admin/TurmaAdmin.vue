<template>
    <div class="turma-admin">
        <h3>Gerênciamento de Turma</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Turma</label>
                <input type="text" class="form-control" placeholder="exemplo: Turma 18:00">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Instrutor</label>
                <select id="inputState" class="form-select">
                    <option selected>Rafael Teixeira</option>
                </select>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
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
                    <td>{{ "Rafael Teixeira" }}</td>
                    <td>
                        <button type="button" class="btn btn-success">
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
            turmas: [],
            URL: "http://localhost:4000/turmas"
        }
    },
    methods: {
        getAllTurmas() {
            axios.get(`${this.URL}`).then(response => {
                this.turmas = response.data
                console.log(this.turmas);
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteTurma(id) {
        axios.delete(this.URL+"/delete/"+id).then(()=>{
            this.getAllTurmas()
        })
    },
    },
    mounted() {
        this.getAllTurmas();
    }
}
</script>

<style>

</style>