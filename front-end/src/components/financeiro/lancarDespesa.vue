<template>
    <div>
        <h3>Lançamento de Despesas</h3>
        <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
            <i class="fa fa-question-circle"></i>
        </button>
        <br/>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Despesa</label>
                <input type="text" class="form-control" placeholder="ex: Energia" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor da Despesa</label>
                <input type="text" class="form-control" placeholder="ex: 185.50" v-model="valor">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Vencimento</label >
                <input type="date" class="form-control" v-model="dataVenc">
            </div>
            <div class="col-12">
                <button type="button" id="button" class="btn btn-primary" @click="createDespesa()" v-show="!editar">+ SALVAR</button>
                <button type="button" id="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <div class="alunos-table">
        <!-- <b-alert show>Testando Alent do Bootstrap Vue</b-alert> -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Despesa</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data Vencimento</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="despesa in despesas" :key="despesa.id_despesa">
                    <th scope="row">{{ despesa.nome_despesa }}</th>
                    <td>R$ {{ despesa.valor_despesa.toFixed(2) }}</td>
                    <td>{{ despesa.vencimento_despesa }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosDespesa(despesa.id_despesa)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <!-- <button type="button" class="btn btn-danger" @click="quitarDespesa(despesa.id_despesa)">
                            <i class="fa fa-check"> </i>
                             Quitar
                        </button> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: 'LancarDespesa',
    data(){
        return {
            URL: "http://localhost:4000",
            despesas: [],
            nome: '',
            valor: '',
            dataVenc: '',
            despesaId: 0,
            editar: false
        }
    },
    methods: {
        getAllDespesas() {
            axios.get(`${this.URL}/despesas`).then(response => {
                this.despesas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        createDespesa(){
            const despesa = {
                nome_despesa: this.nome,
                valor_despesa: this.valor,
                vencimento_despesa: this.dataVenc,
            }
            console.log(despesa);
            axios.post(`${this.URL}/despesas`, despesa).then(response => {
                this.getAllDespesas();
                
            })
            this.limpaDadosFormulario()
        },
        salvarDados(){
            const despesa = {
                nome_despesa: this.nome,
                valor_despesa: this.valor,
                vencimento_despesa: this.dataVenc,
            }
            console.log(despesa);
            axios.put(`${this.URL}/despesas/${this.despesaId}`, despesa).then(response => {
                console.log(response);
                this.getAllDespesas();
            });
            this.limpaDadosFormulario();
        },
        quitarDespesa(id){
            this.editar = true
            const despesa = {
                quitada_despesa: true,
            }
            axios.put(`${this.URL}/despesas/quitar/${id}`, despesa).then(response => {
                console.log(response);
                this.getAllDespesas();
            });
            this.limpaDadosFormulario();
        },
        carregarDadosDespesa(id){
            this.editar = true;
            axios.get(`${this.URL}/despesas/getone/`+id).then(response => {
                const despesa = response.data[0]
                this.despesaId = despesa.id_despesa
                this.nome = despesa.nome_despesa
                this.valor = despesa.valor_despesa
                this.dataVenc = despesa.vencimento_despesa_formatada
                console.log(response.data[0]);
            })
        },
        limpaDadosFormulario(){
            this.nome = '';
            this.valor = '',
            this.dataVenc = '';
            this.despesaId = 0;
            this.editar = false;
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Lançamento de despesa</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#4da6ff">Lançar uma despesa</h3>'+
                    '<p><b>1- </b>Inserir todos os dados: nome da despesa, valor da despesa e data de vencimento.'+
                    '<p><b>2- </b>Após todos dados inseridos clicar no botão "+SALVAR" para lançar despesa ou "CANCELAR" '+
                    'para limpar formulário.'+
                    '<h3 style="color:#39ac6b">Editar uma despesa</h3>'+
                    '<p><b>1- </b>Na lista abaixo do formulário clicar no botão "Editar" na mesma linha correspondente '+
                    'a despesa que deseja alterar o(s) dado(s).'+
                    '<p><b>2- </b>Após clicar no botão "Editar" os dados da respectiva despesa irá carregar no formulário acima, '+
                    'após isso pode alterar o(s) dado(s) que deseja da mesma.'+
                    '<p><b>3- </b>Após editar, para salvar a(s) alteração(ôs) clicar no botão "+EDITAR" (azul) ou "CANCELAR" (vermelho) para cancelar alteração(ôs).'
            })
        }
    },
    mounted() {
        this.getAllDespesas();
    }
}
</script>

<style>

</style>