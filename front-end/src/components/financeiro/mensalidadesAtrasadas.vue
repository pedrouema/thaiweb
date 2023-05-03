<template>
    <h3>Alunos com mensalidade do mês atual em atraso</h3>
    
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Valor Plano</th>
                    <th scope="col">Dia Vencimento</th>
                    <th id="mesAtraso" scope="col">Mês em Atraso</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="aluno in atrasados" :key="aluno.id_aluno">
                    <th scope="row">{{ aluno.nome_aluno }}</th>
                    <td>{{ aluno.cpf_aluno }}</td>
                    <td>{{ aluno.nome_plano }}</td>
                    <td>R$ {{ aluno.valor_plano.toFixed(2) }}</td>
                    <td>{{ aluno.diapag_format }}</td>
                    <td>{{ this.mesEscrito }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'MensalidadesAtrasadas',
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
            atrasado: [],
            pago: [],
            atrasados: [],
            nome: '',
            mesAtual: '',
            mesEscrito: '',
            diaAtual: '',
            anoAtual: '',
            dataAtual: '',
            mesAno: '',
        }
    },
    methods: {
        //RETORNAR TODOS ALUNOS TIPO PLANO MENSALIDADE
        getAllAlunosMensalidade() {
            this.$forceUpdate()
            axios.get(`${this.URL}/alunosmensalidade`).then(response => {
                this.alunos = response.data
                this.getAllJaPagouNoMes();
            })
        },
        //FUNÇÃO TESTE
        getAllJaPagouNoMes() {
            this.pegarDataAtual();
            axios.get(`${this.URL}/recebimentoatrasados/${this.mesAno}`).then(response => {
                this.pago = response.data
                console.log(this.pago);
                this.listaEmAtrasos();
            })
        },
        listaEmAtrasos(){
            console.log(this.alunos);
            for(let i = 0; i < this.alunos.length; i++)
            {
                if(this.alunos[i].diapag_format < 10)
                    this.alunos[i].diapag_format = '0'+this.alunos[i].diapag_format
                for(let j = 0; j < this.pago.length; j++)
                {
                    if(this.alunos[i].id_aluno != this.pago[j].id_aluno && this.alunos[i].diapag_format < this.diaAtual)
                    {
                        if(!this.verificaSePago(this.alunos[i].id_aluno))
                            this.atrasados.push(this.alunos[i]);
                    }
                }
                if(this.pago.length == 0)
                    this.atrasados.push(this.alunos[i]);
            }
        },
        verificaSePago(id){
            for(let i = 0; i < this.pago.length; i++)
            {
                if(id == this.pago[i].id_aluno)
                    return true
            }
            return false
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
            this.mesAno = mes+'-'+ano
            if(this.mesAtual == '01')
                this.mesEscrito = 'Janeiro'
            else if(this.mesAtual == '02')
                this.mesEscrito = 'Fevereiro'
            else if(this.mesAtual == '03')
                this.mesEscrito = 'Março'
            else if(this.mesAtual == '04')
                this.mesEscrito = 'Abril'
            else if(this.mesAtual == '05')
                this.mesEscrito = 'Maio'
            else if(this.mesAtual == '06')
                this.mesEscrito = 'Junho'
            else if(this.mesAtual == '07')
                this.mesEscrito = 'Julho'
            else if(this.mesAtual == '08')
                this.mesEscrito = 'Agosto'
            else if(this.mesAtual == '09')
                this.mesEscrito = 'Setembro'
            else if(this.mesAtual == '10')
                this.mesEscrito = 'Outubro'
            else if(this.mesAtual == '11')
                this.mesEscrito = 'Novembro'
            else 
                this.mesEscrito = 'Dezembro'
        },
        limpaDados() {
            this.atrasado = '';
        }
    },
    mounted() {
        this.getAllAlunosMensalidade();
    }
}
</script>

<style>
    th#mesAtraso{
        background-color: rgb(192, 56, 56);
    }
</style>