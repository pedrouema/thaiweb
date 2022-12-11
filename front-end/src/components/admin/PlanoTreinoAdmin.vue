<template>
    <div class="plano-treino-admin">
        <h3>Gerênciamento de Planos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Plano</label>
                <input type="text" class="form-control" placeholder="Nome do Plano">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor Mensalidade</label>
                <input type="text" class="form-control" id="inputZip" placeholder="R$ 100,00">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
    <hr/>
    <div class="plano-treino-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome do Plano</th>
                    <th scope="col">Valor Mensalidade</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="plano in planos" :key="plano.id_plano">
                    <th scope="row">{{ plano.id_plano }}</th>
                    <td>{{ plano.nome_plano }}</td>
                    <td>R$ {{ plano.valor_plano }}</td>
                    <td>
                        <button type="button" class="btn btn-success">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="deletePlano(plano.id_plano)">
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
    name: 'PlanoTreinoAdmin',
    data() {
        return{
            planos: [],
            URL: "http://localhost:4000/planos"
        }
    },
    methods: {
        getAllPlanos() {
            axios.get(`${this.URL}`).then(response => {
                this.planos = response.data
                console.log(this.planos);
            })
            .catch(error => {
                console.log(error);
            })
        },
        deletePlano(id) {
            axios.delete(this.URL+"/delete/"+id).then(()=>{
                this.getAllPlanos()
            })
        },
    },
    mounted() {
        this.getAllPlanos();
    }
}
</script>

<style>

</style>