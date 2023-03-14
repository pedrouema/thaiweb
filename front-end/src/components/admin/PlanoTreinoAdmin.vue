<template>
    <div class="plano-treino-admin">
        <h3>Gerenciamento de Planos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Plano</label>
                <input type="text" class="form-control" placeholder="ex: Grupo 3x, 18:00" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor Mensalidade</label>
                <input type="text" class="form-control" id="inputZip" placeholder="ex: R$99.99" v-model="valor">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createPlano()" v-show="!editar">+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
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
                    <td>R$ {{ plano.valor_plano.toFixed(2) }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosPlano(plano.id_plano)">
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
import AlunoAdmin from './AlunoAdmin.vue'

export default {
    name: 'PlanoTreinoAdmin',
    components: { AlunoAdmin },
    data() {
        return{
            URL: "http://localhost:4000",
            planos: [],
            planoId: 0,
            nome: '',
            valor: '',
            editar: false,
        }
    },
    methods: {
        getAllPlanos() {
            axios.get(`${this.URL}/planos`).then(response => {
                this.planos = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        createPlano(){
            const plano = {
                nome_plano: this.nome,
                valor_plano: this.valor,
                
            }
            axios.post(`${this.URL}/planos`, plano).then(response => {
                this.getAllPlanos();
                
            })
            this.limpaDadosFormulario()
        },
        carregarDadosPlano(id){
            this.editar = true;
            axios.get(`${this.URL}/planos/getone/`+id).then(response => {
                const plano = response.data[0]
                this.planoId = plano.id_plano
                this.nome = plano.nome_plano
                this.valor = plano.valor_plano
            })
        },
        salvarDados(){
            const plano = {
                nome_plano: this.nome,
                valor_plano: this.valor,
            }
            console.log(plano);
            axios.put(`${this.URL}/planos/${this.planoId}`, plano).then(response => {
                this.getAllPlanos();
            });
            this.limpaDadosFormulario();
        },
        deletePlano(id) {
            axios.delete(this.URL+"/planos/delete/"+id).then(()=>{
                this.getAllPlanos()
            })
            
        },
        limpaDadosFormulario(){
            this.planoId = 0;
            this.nome = '';
            this.valor = '';
            this.editar = false;
        },
    },
    mounted() {
        this.getAllPlanos();
    }
}
</script>

<style>

</style>