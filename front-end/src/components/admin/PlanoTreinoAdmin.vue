<template>
    <div class="plano-treino-admin">
        <h3>Gerenciamento de Planos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Plano</label>
                <input type="text" class="form-control" placeholder="ex: Grupo 3x, 18:00" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor do Plano</label>
                <input type="text" class="form-control" id="inputZip" placeholder="ex: R$99.99" v-model="valor">
            </div>
        </form>
        <br>
        <label for="inputZip" class="form-label">Selecione o tipo de plano: </label><br>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" v-model="tipomensal"/>
            <label class="form-check-label" for="inlineCheckbox1">Mensalidade</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" v-model="tipoavulso"/>
            <label class="form-check-label" for="inlineCheckbox2">Avulso</label>
        </div>
        <br>
        <br>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="createPlano()" v-show="!editar">+ SALVAR</button>
            <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
            <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
        </div>
    </div>
    <hr/>
    <div class="plano-treino-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome do Plano</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valor do Plano</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="plano in planos" :key="plano.id_plano">
                    <th scope="row">{{ plano.nome_plano }}</th>
                    <td>{{ plano.tipo_plano }}</td>
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
            tipomensal: false,
            tipoavulso: false,
            tipoplano: ''
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
            if(this.tipomensal)
                this.tipoplano = "Mensalidade"
            if(this.tipoavulso)
                this.tipoplano = "Avulso"
            const plano = {
                nome_plano: this.nome,
                valor_plano: this.valor,
                tipo_mensal: this.tipomensal,
                tipo_avulso: this.tipoavulso,
                tipo_plano: this.tipoplano
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
                this.tipomensal = plano.tipo_mensal
                this.tipoavulso = plano.tipo_avulso
            })
        },
        salvarDados(){
            if(this.tipomensal)
                this.tipoplano = "Mensalidade"
            if(this.tipoavulso)
                this.tipoplano = "Avulso"
            const plano = {
                nome_plano: this.nome,
                valor_plano: this.valor,
                tipo_mensal: this.tipomensal,
                tipo_avulso: this.tipoavulso,
                tipo_plano: this.tipoplano
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
            this.tipomensal = false;
            this.tipoavulso = false;
        },
    },
    mounted() {
        this.getAllPlanos();
    }
}
</script>

<style>

</style>