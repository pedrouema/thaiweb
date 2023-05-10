<template>
    <h2>Balanço Financeiro de Entrada e Saída</h2>
    <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
        <i class="fa fa-question-circle"></i>
    </button>
    <div>
        <form class="row g-3">
        <h5>Selecione as datas inicio e fim para visualizar o balanço entre os períodos.</h5>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Inicio</label >
            <input type="date" class="form-control" v-model="dataIni">
        </div>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Fim</label >
            <input type="date" class="form-control" v-model="dataFim">
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="buscarBalanco()">
                <i class="fa fa-search"></i> BUSCAR</button>
        </div>
    </form>
    <div class="recebidas-table">
        <br>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col" style="background-color: olivedrab;">Total Entrada</th>
                    <th scope="col" style="background-color:indianred;">Total Saída</th>
                    <th scope="col" style="background-color:cornflowerblue;">Ganho Bruto</th>
                    <th scope="col" style="background-color:greenyellow;">Ganho Líquido</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr >
                    <td scope="row">R$ {{ this.entrada.toFixed(2) }}</td>
                    <td>R$ {{ this.saida.toFixed(2) }}</td>
                    <td>R$ {{ this.entrada.toFixed(2) }}</td>
                    <td style="font-weight: bold;">R$ {{ this.liquido.toFixed(2) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AnalisesFinanceiro',
    data(){
        return{
            URL: "http://localhost:4000",
            dataIni: '',
            dataFim: '',
            saida: 0,
            entrada: 0,
            liquido: 0,
        }
    },
    methods: {
        getValorSaida(){
            axios.get(`${this.URL}/getvalorsaida/${this.dataIni}/${this.dataFim}`).then(response => {
                this.saida = response.data[0].sum;
                if(this.saida == null)
                    this.saida = 0;
                this.liquido = (this.entrada - this.saida);
            })
            .catch(error => {
                console.log(error);
            })
        },
        getValorEntrada(){
            axios.get(`${this.URL}/getvalorentrada/${this.dataIni}/${this.dataFim}`).then(response => {
                this.entrada = response.data[0].sum
                if(this.entrada == null)
                    this.entrada = 0;
                this.getValorSaida();
            })
            .catch(error => {
                console.log(error);
            })
        },
        buscarBalanco(){
            this.limpaDados()
            this.getValorEntrada() 
        },
        limpaDados(){
            this.entrada = 0;
            this.saida = 0;
            this.liquido = 0;
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Balanço Financeiro de Entrada e Saída</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#39ac6b">Verificar Balanço financeiro</h3>'+
                    '<b>IMPORTANTE </b><p>Despesa(s) (saídas) devem ter sido pagas e pagamento(s) (entradas) devem ter sido recebidas.</p>' +
                    '<p><b>1- </b>Para visualizar o balanço financeiro de um certo período, selecione a data inicio e a data fim.'+
                    '<p><b>2- </b>Após selecionar ambas as datas clicar no botão "BUSCAR".'+
                    '<p><b>3- </b>Após clicar em "BUSCAR", irá carregar em uma lista abaixo com os seguintes valores entre o periodo selecionado: '+
                    'Total Entrada, Total Saída, Ganho Bruto, Ganho Líquido.'
            })
        }
    },

}
</script>

<style>

</style>