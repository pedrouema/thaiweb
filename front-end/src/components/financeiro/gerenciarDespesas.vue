<template id="form">
    <h3>Gerenciamento de Despesas</h3>
    <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
        <i class="fa fa-question-circle"></i>
    </button>
    <br/>
    <form class="row g-3">
        <h5>Selecione o filtro de ação e as datas inicio e fim para buscar as despesas.</h5>
        <div class="col-md-4" >
                <label for="inputState" class="form-label">Selecione a ação desejada</label>
                <select class="form-select" v-model="QualTabela">
                    <option value="Quitar Despesa">Quitar Despesa</option>
                    <option value="Ver despesas Quitadas">Ver Despesas Quitadas</option>
                </select>
            </div>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Inicio</label >
            <input type="date" class="form-control" v-model="dataIni">
        </div>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Fim</label >
            <input type="date" class="form-control" v-model="dataFim">
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="buscarDespesas()">
                <i class="fa fa-search"></i> BUSCAR</button>
        </div>
    </form>
    <br/>
    <div class="alunos-table">
        <!-- Tabela de Despesas à Quitar -->
        <table class="table" v-show="tabela == 1">
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
                        <button type="button" class="btn btn-success" @click="quitar(despesa.id_despesa)">
                            <!-- @click="quitarDespesa(despesa.id_despesa)" -->
                            <i class="fa fa-dollar"> </i>
                             Quitar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Tabela de Despesas já Pagas -->
        <div class="despesasPagas-table" v-show="tabela == 2">
        <table class="table" >
            <thead>
                <tr>
                    <th scope="col">Despesa</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data Vencimento</th>
                    <th scope="col">Data Pagamento</th>
                    <th scope="col">Valor Pago</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="despesa in despesas" :key="despesa.id_despesa">
                    <th scope="row">{{ despesa.nome_despesa }}</th>
                    <td>R$ {{ despesa.valor_despesa.toFixed(2) }}</td>
                    <td>{{ despesa.vencimento_despesa }}</td>
                    <td>{{ despesa.pagamento_despesa }}</td>
                    <td>R$ {{ despesa.valorpag_despesa }}</td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="showAlertVoltar(despesa.id_despesa)">
                            <i class="fa fa-reply-all"> </i>
                             Voltar (Não Foi Paga)
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>

<script>

import RelatorioDespesasPaga from './RelatorioDespesasPaga'


export default {
    name: 'GerenciarDespesas',
    components: { RelatorioDespesasPaga },
    template: '#form',
    data(){
        return {
            URL: "http://localhost:4000",
            despesas: [],
            nome: '',
            valor: '',
            dataVenc: '',
            dataIni: '',
            dataFim: '',
            despesaId: 0,
            tabela: 0,
            QualTabela: '',
            valor_pago: 0,
            data_pagamento:'',
        }
    },
    methods: {
        quitarDespesa(id){
            this.editar = true
            const despesa = {
                quitada_despesa: true,
                //Continuar aqui... Acrescentar valor pago e data de pagamento... e depois alterar no back-end
                valorpag_despesa: this.valor_pago,
                datapag_despesa: this.data_pagamento
            }
            axios.put(`${this.URL}/despesas/quitar/${id}`, despesa).then(response => {
                this.getAllDespesas();
            });
            //this.limpaDadosFormulario();
        },
        // função alert de input de valor pago e data de pagamento quando quitar uma conta
        async quitar(id){
            const { value: formValues } = await this.$swal.fire({
                title: 'Quitar despesa! ',
                html:
                    '<label for="inputState" class="form-label">Digite o valor pago</label>' +
                    '<input type="number" id="swal-input1" class="swal2-input"> </br></br>' +
                    '________________________________________________________________ </br></br>' +
                    '<label for="inputState" class="form-label">Selecione a data do pagamento</label>' +
                    '<input type="date" id="swal-input2" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                    ]
                }
            })
            if (formValues) {
                this.valor_pago = formValues[0]
                this.data_pagamento = formValues[1]
                this.showAlertQuitar(id)
            }
        },
        showAlertQuitar(id) {
            // Use sweetalert2
            const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'Deseja realmente quitar esta despesa?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, quitar agora!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'DESPESA QUITADA COM SUCESSO!',
                '',
                'success'
                )
                this.quitarDespesa(id)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado! ',
                'Despesa não foi quitada! ',
                'error'
                )
            }
            })
        },
        buscarDespesas(){
            if(this.QualTabela == 'Ver despesas Quitadas'){
                this.tabela = 2
                if(this.dataIni == '' && this.dataFim == ''){
                    this.getAllDespesasQuitadas()
                }
                else{
                    //função para buscar entre datas que quitada_despesa == true
                    this.retornaQuitadasEntreDatas()
                    this.limpaDados()
                }
            }
            else if(this.QualTabela == 'Quitar Despesa'){
                this.tabela = 1
                if(this.dataIni == '' && this.dataFim == ''){
                    this.getAllDespesas()
                }
                else{
                    this.retornaNaoQuitadasEntreDatas()
                    this.limpaDados()
                }
            }
        },
        getAllDespesas() {
            axios.get(`${this.URL}/despesas`).then(response => {
                this.despesas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        getAllDespesasQuitadas() {
            axios.get(`${this.URL}/despesasquitadas`).then(response => {
                this.despesas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        voltarDespesa(id){
            const despesa = {
                quitada_despesa: false,
            }
            axios.put(`${this.URL}/despesas/voltar/${id}`, despesa).then(response => {
                this.getAllDespesasQuitadas();
            });
        },
        showAlertVoltar(id) {
            // Use sweetalert2
            const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'Deseja realmente voltar esta despesa aos não quitadas?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, voltar agora!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'DESPESA RETORNADA COM SUCESSO!',
                '',
                'success'
                )
                this.voltarDespesa(id)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado! ',
                'Despesa não foi retornada! ',
                'error'
                )
            }
            })
        },
        retornaNaoQuitadasEntreDatas(){
            axios.get(`${this.URL}/despesasnaoquitadasentredatas/${this.dataIni}/${this.dataFim}`).then(response => {
                this.despesas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        retornaQuitadasEntreDatas(){
            axios.get(`${this.URL}/despesasquitadasentredatas/${this.dataIni}/${this.dataFim}`).then(response => {
                this.despesas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        limpatabela(){
            this.tabela = 0
        },
        limpaDados(){
            // this.dataIni = ''
            // this.dataFim = ''
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Gerenciamento de despesas</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#ff6666">Quitar uma despesa</h3>'+
                    '<b>IMPORTANTE </b><p>Para quitar uma despesa a mesma deve estar previamente lançada.</p>' +
                    '<p><b>1- </b>Selecione a ação "Quitar Despesa" em "Selecione a ação desejada". Para carregar despesas em um certo periodo '+
                    'deve ser selecionado obrigatoriamente a "Data inicio" e "Data Fim" e clicar no botão "BUSCAR" (azul). Caso queira ver todas '+
                    'as despesas lançadas para quitar, selecione apenas "Quitar despesa" sem selecionar "Data Inicio" e Data Fim e clicar no '+
                    'botão "BUSCAR".'+
                    '<p><b>2- </b>Após buscar a(s) despesa(s) para quitar, a(s) mesma(s) sera(âo) carregada(s) em uma lista abaixo do formulário, '+
                    'basta clicar no botão "Editar" (verde) na mesma linha correspondente a despesa que deseja quitar'+
                    '<p><b>3- </b>Após clicar em "Editar" irá abrir uma tela, nela insira o valor pago da despesa e a data do pagamento e clique em "OK".'+
                    '<p><b>4- </b>Após clicar em "OK" irá abrir outra tela de comfirmação, clique em "Sim, quitar agora!" para quitar a despesa '+
                    'ou "Não, cancelar!" para cancelar a ação.'+
                    '<h3 style="color:#39ac6b">Verificar despesas quitadas e Voltar uma despesa não quitada</h3>'+
                    '<p><b>1- </b>Selecione a ação "Ver Despesas Quitadas" em "Selecione a ação desejada". Para carregar despesas quitadas de um certo periodo '+
                    'deve ser selecionado obrigatoriamente a "Data inicio" e "Data Fim" e clicar no botão "BUSCAR" (azul). Caso queira ver todas '+
                    'as despesas lançadas para quitar, selecione apenas "Quitar despesa" sem selecionar "Data Inicio" e Data Fim e clicar no '+
                    'botão "BUSCAR".'+
                    '<p><b>2- </b>Após buscar a(s) despesa(s) quitada(s), a(s) mesma(s) sera(âo) carregada(s) em uma lista abaixo do formulário. '+
                    'Caso queira retornar uma despesa que não foi quitada, clique no botão "Voltar(Não Foi Paga)" na mesma linha correspondente '+
                    'a despesa que deseja retornar.'+
                    '<p><b>3- </b>Após clicar em "Voltar(Não Foi Paga)" irá abrir uma tela para confirmar se deseja realmente voltar a despesa, clique '+
                    'em "Sim, voltar agora!" para comfirmar ou "Não, cancelar!" para cancelar a ação.'
            })
        }
    },
    mounted() {
        
    }
}
</script>

<style>

</style>