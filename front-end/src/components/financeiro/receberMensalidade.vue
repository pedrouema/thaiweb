<template>
    <h3>Recebimento</h3>
    <button type="button" id="btnAjuda" class="btn btn-primary btn-floating" @click="ajuda()">
        <i class="fa fa-question-circle"></i>
    </button>
    <form class="form-inline">
        <h5>Busque pelo o nome do aluno que deseja receber!</h5>
        <div class="form-group mb-2">
            <label for="inputZip" class="form-label">Digite o nome do aluno</label >
            <input type="text" class="form-control" v-model="nome">
        </div>
        <button type="button" class="btn btn-primary" @click="buscar()">
            <i class="fa fa-search"></i> BUSCAR</button>
    </form>
    <br>
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Valor Plano</th>
                    <th scope="col">Dia Vencimento</th>
                    <th scope="col">Total à Pagar</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="aluno in alunos" :key="aluno.id_aluno">
                    <th scope="row">{{ aluno.nome_aluno }}</th>
                    <td>{{ aluno.cpf_aluno }}</td>
                    <td>{{ aluno.nome_plano }}</td>
                    <td>R${{ aluno.valor_plano.toFixed(2) }}</td>
                    <td>{{ aluno.diapag_format }}</td>
                    <td>R${{ aluno.valor_plano.toFixed(2) }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="receber(aluno.id_aluno)">
                            <i class="fa fa-dollar"> </i>
                             Receber
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: 'ReceberMensalidade',
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
            nome: '',
            dataRecebimento: '',
            valorRecebimento: '',
            mensalidade: false,
            plano: '',
            mesRecebimento: '',
            mesAtual: '',
            diaAtual: '',
            anoAtual: '',
            dataAtual: '',

        }
    },
    methods: {
        buscar() {
            axios.get(`${this.URL}/alunos/getnome/`+this.nome).then(response => {
                this.alunos = response.data
            })
            this.limpaDados()
        },
        async receber(id_aluno) {
            
            for(let i = 0; i < this.alunos.length; i++)
            {
                if(this.alunos[i].id_aluno == id_aluno)
                    this.mensalidade = this.alunos[i].tipo_mensal
            }
            if(!this.mensalidade){
                const { value: formValues } = await this.$swal.fire({
                    title: 'Receber Pagamento! ',
                    html:
                        '<label for="inputState" class="form-label">Digite o valor recebido</label>' +
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
                    this.valorRecebimento = formValues[0]
                    this.dataRecebimento = formValues[1]
                    this.showAlertReceber(id_aluno)
                }
            }
            else{
                const { value: formValues } = await this.$swal.fire({
                    title: 'Receber Pagamento! ',
                    html:
                        '<label for="inputState" class="form-label">Selecione o mês à receber:</label>' +
                        '<select type="number" id="swal-input1" class="swal2-input">' +
                            '<option value="01">Janeiro</option>' +
                            '<option value="02">Fevereiro</option>' +
                            '<option value="03">Março</option>' +
                            '<option value="04">Abril</option>' +
                            '<option value="05">Maio</option>' +
                            '<option value="06">Junho</option>' +
                            '<option value="07">Julho</option>' +
                            '<option value="08">Agosto</option>' +
                            '<option value="09">Setembro</option>' +
                            '<option value="10">Outubro</option>' +
                            '<option value="11">Novembro</option>' +
                            '<option value="12">Dezembro</option>' +
                        '</select>' +
                        '________________________________________________________________ </br></br>' +
                        '<label for="inputState" class="form-label">Digite o valor recebido</label>' +
                        '<input type="number" id="swal-input2" class="swal2-input"> </br></br>' +
                        '________________________________________________________________ </br></br>' +
                        '<label for="inputState" class="form-label">Selecione a data do pagamento</label>' +
                        '<input type="date" id="swal-input3" class="swal2-input">',
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value
                        ]
                    }
                })
                if (formValues) {
                    this.mesRecebimento = formValues[0]
                    this.valorRecebimento = formValues[1]
                    this.dataRecebimento = formValues[2]
                    this.showAlertReceber(id_aluno)
                }
            }
        },
        showAlertReceber(id_aluno) {
            // Use sweetalert2
            const swalWithBootstrapButtons = this.$swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
            title: 'Deseja realmente receber este pagamento?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim, receber agora!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                'PAGAMENTO RECEBIDO COM SUCESSO!',
                '',
                'success'
                )
                this.criaRecebimento(id_aluno)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === this.$swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado! ',
                'Pagamento não recebido! ',
                'error'
                )
            }
            })
        },
        criaRecebimento(id_aluno) {
            const recebimento = {
                mes_referente: this.mesRecebimento+'-'+this.anoAtual,
                valor_recebimento: this.valorRecebimento,
                data_recebimento: this.dataRecebimento,
                id_aluno: id_aluno
            }
            axios.post(`${this.URL}/recebimentos`, recebimento).then(response => {
                
            })
            this.limpaDados()
            window.location.reload(true)
        },
        pegarDataAtual() {
            const data = new Date()
            const dia = String(data.getDate()).padStart(2, '0')
            const mes = String(data.getMonth() + 1).padStart(2, '0')
            const ano = String(data.getFullYear())
            const atual = `${dia}/${mes}/${ano}`
            this.mesAtual = mes
            this.diaAtual = dia
            this.anoAtual = ano
            this.dataAtual = atual
        },
        limpaDados() {
            this.nome = '';
            this.valorRecebimento = '';
            this.dataRecebimento = '';
            this.mesRecebimento = '';
        },      
        ajuda(){
            this.$swal.fire({
                title: '<h2>Recebimento</h2>',
                icon: 'info',
                html:
                    '<h3 style="color:#39ac6b"">Receber um pagamento</h3>'+
                    '<b>IMPORTANTE </b><p>O aluno deve estar previamente cadastrado e matriculado em um plano.</p>' +
                    '<p><b>1- </b>Digite o nome do aluno que deseja receber e clique em "BUSCAR".'+
                    '<p><b>2- </b>Após clicar em "BUSCAR" irá carregar uma lista abaixo do formulário, clique no botão "Receber"(verde) '+
                    'para iniciar processo de recebimento.'+
                    '<p><b>3- </b>Irá abrir uma tela para inserir os dados do recebimento, podendo ser para alunos do tipo mensalidade(3.1) ou avulso(3.2)'+
                    '<p><b>3.1- </b>Caso seja um aluno do tipo mensalidade, preencher os seguintes dados do recebimento: "Selecione o mês à receber", '+
                    '"Digite o valor recebido" e "Selecione a data do recebimento" e clique em "OK"'+
                    '<p><b>3.2- </b>Caso seja um aluno do tipo avulso, preencher os seguintes dados do recebimento: '+
                    '"Digite o valor recebido" e "Selecione a data do recebimento" e clique em "OK"'+
                    '<p><b>4- </b>Irá abrir uma tela para confirmar se deseja realmente receber o pagamento, clique '+
                    'em "Sim, receber agora!" para comfirmar ou "Não, cancelar!" para cancelar a ação.'
            })
        }
    },
    mounted() {
        this.pegarDataAtual();
    }
}
</script>

<style>

</style>