<template>
    <h3>Pagamento Recebidos</h3>
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
    <br>
    <div class="recebidas-table">
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
        },
        limpaDados() {
            this.dataIni = '';
            this.dataFim = '';
        }
    }

}
</script>

<style>

</style>