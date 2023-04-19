<template>
    <h3>Mensalidades em atraso</h3>
    <form class="form-inline">
        <h5>Busque pelo o nome do aluno que deseja verificar!</h5>
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
                    <th id="mesAtraso" scope="col">Mês em Atraso</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="receb in atrasados" :key="receb.id_mensalidade">
                    <th scope="row">{{ receb.nome_aluno }}</th>
                    <td>{{ receb.cpf_aluno }}</td>
                    <td>{{ receb.nome_plano }}</td>
                    <td>R$ {{ receb.valor_plano.toFixed(2) }}</td>
                    <td>{{ receb.diapag_format }}</td>
                    <td>{{ this.mesAtual }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import { FORMERR } from 'dns'

export default {
    name: 'MensalidadesAtrasadas',
    data(){
        return {
            URL: "http://localhost:4000",
            alunos: [],
            atrasado: [],
            atrasados: [],
            nome: '',
            mesAtual: '',
            diaAtual: '',
            anoAtual: '',
            dataAtual: '',
            mesAno: '',
        }
    },
    methods: {
        //FUNÇÃO PARA MANDAR TODOS ID ALUNOS PARA VERIFICAR PAGAMENTO NA TABELA RECEBIMENTOS 
        
        //RETORNAR TODOS ALUNOS TIPO PLANO MENSALIDADE
        getAllAlunosMensalidade() {
            axios.get(`${this.URL}/alunosmensalidade`+this.mesAtual).then(response => {
                this.alunos = response.data
                console.log(this.alunos);
            })
            //this.limpaDados()
        },
        getAtrasados() {
            axios.get(`${this.URL}/recebimentoatrasadas/`+this.mesAtual).then(response => {
                this.atrasados = response.data
                console.log(response.data);
            })
        },
        //FUNÇÃO TESTE
        teste() {
            for(let i = 0; i < this.alunos.length; i++){
                axios.get(`${this.URL}/recebimentoatrasadas/`+this.alunos[i].id_aluno+'/'+this.mesAno).then(response => {
                this.atrasado = response.data[0]
                console.log(response.data);
                })
                this.atrasados[i] = this.atrasado[0];
                this.limpaDados();
            }
            
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

        },
        limpaDados() {
            this.atrasado = '';
        }
    },
    mounted() {
        this.getAllAlunosMensalidade();
        this.pegarDataAtual();
        this.getAtrasados();
    }
}
</script>

<style>
    th#mesAtraso{
        background-color: rgb(192, 56, 56);
    }
</style>