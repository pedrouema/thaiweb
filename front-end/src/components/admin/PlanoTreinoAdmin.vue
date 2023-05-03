<template>
    <div class="plano-treino-admin">
        <h3>Gerenciamento de Planos</h3>
        <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
            <i class="fa fa-question-circle"></i>
        </button>
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
            <button type="button" id="button" class="btn btn-primary" @click="createPlano()" v-show="!editar">+ SALVAR</button>
            <button type="button" id="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
            <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
        </div>
    </div>
    <br/>
    <hr/>
    <div class="plano-treino-table">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-dark" type="button" v-on:click.prevent="abrirRelatorio()"><i class="fa fa-print"> </i> Imprimir</button>
        </div>
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
                        <button type="button" id="btnAcoes" class="btn btn-success" @click="carregarDadosPlano(plano.id_plano)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" id="btnAcoes" class="btn btn-danger" @click="deletePlano(plano.id_plano)">
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
        abrirRelatorio(){
            const win = window.open('http://localhost:8080/relatorioplanos')
            win.focus()
        },
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
            window.location.reload(true)
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
            window.location.reload(true)
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
        ajuda(){
            this.$swal.fire({
                title: '<h2>Gerenciamento de Planos</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#4da6ff">Cadastrar novo plano</h3>'+
                    '<p><b>1- </b>Inserir todos os dados: nome do plano, valor do plano e selecionar o tipo se é mensalidade ou avulso.'+
                    '<p><b>2- </b>Após todos dados inseridos clicar no botão "+SALVAR" para salvar cadastro ou "CANCELAR" '+
                    'para limpar formulário.'+
                    '<h3 style="color:#39ac6b">Editar um plano</h3>'+
                    '<p><b>1- </b>Na lista abaixo do formulário clicar no botão "Editar" na mesma linha correspondente '+
                    'ao plano que deseja alterar o(s) dado(s).'+
                    '<p><b>2- </b>Após clicar no botão "Editar" os dados do respectivo plano irá carregar no formulário acima, '+
                    'após isso pode alterar o(s) dado(s) que deseja do mesmo.'+
                    '<p><b>3- </b>Após editar, para salvar a(s) alteração(ôs) clicar em "+SALVAR" ou "CANCELAR" para cancelar alteração(ôs).'+
                    '<h3 style="color:#ff6666">Excluir um plano</h3>'+
                    '<b>IMPORTANTE </b><p>Para excluir um plano, nenhum aluno deve estar usando o mesmo.</p>' +
                    '<p><b>1- </b>Na lista abaixo do formulário, clicar no botão "Excluir" na mesma linha correspondente '+
                    'ao plano que deseja fazer a exclusão.'+
                    '<p><b>2- </b>Após clicar no botão "Excluir" o plano será excluido permanentemente. Para recuperar o mesmo, deve ser '+
                    'feito o passo a passo de "Cadastrar novo plano".'
            })
        }
    },
    mounted() {
        this.getAllPlanos();
    }
}
</script>

<style>

</style>