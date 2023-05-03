<template>
    <h3>Pagamentos Recebidos</h3>
    <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
        <i class="fa fa-question-circle"></i>
    </button>
    <form class="row g-3">
        <h5>Selecione as datas inicio e fim para buscar recebimentos confirmados.</h5>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Inicio</label >
            <input type="date" class="form-control" v-model="dataIni">
        </div>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Fim</label >
            <input type="date" class="form-control" v-model="dataFim">
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="buscarRecebidas()">
                <i class="fa fa-search"></i> BUSCAR</button>
        </div>
    </form>
    <div class="recebidas-table">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button class="btn btn-dark" type="button" ><i class="fa fa-print"> </i> Imprimir</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data do Recebimento</th>
                    <th scope="col">Valor Recebido</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="recebida in recebidas" :key="recebida.id_mensalidade">
                    <th scope="row">{{ recebida.nome_aluno }}</th>
                    <td>{{ recebida.cpf_aluno }}</td>
                    <td>{{ recebida.data_recebimento }}</td>
                    <td>R${{ recebida.valor_recebimento.toFixed(2) }}</td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="showAlertApagar(recebida.id_mensalidade)">
                            <i class="fa fa-trash"> </i>
                             Voltar (Não Foi Recebido)
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
    name: "VerMensalidadesRecebidas",
    data(){
        return {
            URL: "http://localhost:4000",
            recebidas: [],
            dataIni: '',
            dataFim: '',
        }
    },
    methods: {
        getAllRecebidas() {
            axios.get(`${this.URL}/getallrecebidas`).then(response => {
                this.recebidas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        buscarRecebidas() {
            if(this.dataIni == '' && this.dataFim == ''){
                this.getAllRecebidas()
            }
            else{
                this.retornaRecebidasEntreDatas()
                console.log('Passou por data despesas quitadas');
                this.limpaDados()
            }
        },
        retornaRecebidasEntreDatas(){
            axios.get(`${this.URL}/recebidasentredatas/${this.dataIni}/${this.dataFim}`).then(response => {
                this.recebidas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        showAlertApagar(id) {
            // Use sweetalert2
            const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'Deseja realmente apagar esta fatura recebida?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, apagar agora!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'FATURA RECEBIDA APAGADA COM SUCESSO!',
                '',
                'success'
                )
                this.apagarDespesa(id)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'CANCELADO! ',
                'VALOR RECEBIDO NÃO FOI APAGADO! ',
                'error'
                )
            }
            })
        },
        apagarDespesa(id) {
            axios.delete(this.URL+"/recebimento/delete/"+id).then(()=>{
                this.buscarRecebidas()
            })
            window.location.reload(true)
        },
        limpaDados() {
            this.dataIni = '';
            this.dataFim = '';
        },
        ajuda(){
            this.$swal.fire({
                title: '<h2>Pagamentos recebidos</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#39ac6b">Verificar recebimentos e Voltar pagamentos não recebidos</h3>'+
                    '<b>IMPORTANTE </b><p>Pagamento deve ter sido recebido previamente.</p>' +
                    '<p><b>1- (Não recomendado): </b>Caso queira verificar todos pagamentos recebidos, não selecionar "Data Inicio" e nem "Data Fim", '+
                    'basta clicar no botão "BUSCAR" diretamente.'+
                    '<p><b>2- (Recomendado): </b>Para verificar pagamentos recebidos entre determinado periodo, selecione uma "Data Inicio" '+
                    'e "Data Fim" e clique em "BUSCAR".'+
                    '<p><b>3- </b>Após clicar em "BUSCAR", irá carregar uma lista dos pagamentos recebidos abaixo.'+
                    '<p><b>4- </b>Caso queira voltar um pagamento, clique no botão "Voltar (Não Foi Recebido)" na mesma linha correspondente '+
                    'ao pagamento recebido que deseja retornar.'+
                    '<p><b>5- </b>Após clicar em "Voltar (Não Foi Recebido)", irá abrir uma tela de confirmação se realmente deseja retornar '+
                    'a fatura recebida, clique em "Sim, apagar agora!" para confirmar ou "Não, cancelar!" para cancelar a ação.'

            })
        }
    }

}
</script>

<style>

</style>