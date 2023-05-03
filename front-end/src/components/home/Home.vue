<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento" />
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    <div class="card h-100">
                        <img src="@/assets/alunos.jpg" class="card-img-top" alt="Skyscrapers"/>
                        <div class="card-body" id="card1">
                            <h2 class="card-title">Alunos Cadastrados</h2>
                            <h1 class="card-text" style="text-align: center;">{{ qtdeAluno }}</h1>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <img src="@/assets/pagamento.gif" class="card-img-top" alt="Skyscrapers"/>
                        <div class="card-body" id="card2">
                            <h2 class="card-title">Mensalidades Atrasadas</h2>
                            <h1 class="card-text" style="text-align: center;">{{ qtdeAtrasados }}</h1>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                        <img src="@/assets/treino.jpg" class="card-img-top" alt="Skyscrapers"/>
                        <div class="card-body" id="card3">
                            <h2 class="card-title">Treinos hoje</h2>
                            <h1 class="card-text" style="text-align: center;">{{ qtdeTreino }}</h1>
                        </div>
                    </div>
                </div>
            </div>   
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import axios from 'axios'

export default {
    name: 'Home',
    components: { PageTitle},
    data(){
        return{
            URL: "http://localhost:4000",
            alunoss: [],
            alunos: [],
            pago: [],
            atrasados: [],
            qtdeAluno: 0,
            qtdeAtrasados: 0,
            qtdeTreino: 0,
            treinos: [],
            diaDaSemana: '',
            mesAtual: '',
            mesEscrito: '',
            diaAtual: '',
            anoAtual: '',
            dataAtual: '',
            mesAno: '',
        }
    },
    methods:{
        getQtdeAlunos() {
            axios.get(`${this.URL}/alunostotal`).then(response => {
                this.alunoss = response.data[0]
                this.qtdeAluno = this.alunoss.count
            })
            .catch(error => {
                console.log(error);
            })
        },
        getQtdeTreinos() {
            if(this.diaDaSemana == 'segunda-feira'){
                axios.get(`${this.URL}/cronogramaqtdesegunda`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(this.diaDaSemana == 'terça-feira'){
                axios.get(`${this.URL}/cronogramaqtdeterca`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(this.diaDaSemana == 'quarta-feira'){
                axios.get(`${this.URL}/cronogramaqtdequarta`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(this.diaDaSemana == 'quinta-feira'){
                axios.get(`${this.URL}/cronogramaqtdequinta`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(this.diaDaSemana == 'sexta-feira'){
                axios.get(`${this.URL}/cronogramaqtdesexta`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else if(this.diaDaSemana == 'sábado'){
                axios.get(`${this.URL}/cronogramaqtdesabado`).then(response => {
                    this.treinos = response.data[0]
                    this.qtdeTreino = this.treinos.count
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                this.qtdeTreino = 0;
            }
            
        },
        getAllAlunosMensalidade() {
            this.$forceUpdate()
            axios.get(`${this.URL}/alunosmensalidade`).then(response => {
                this.alunos = response.data
                this.getAllJaPagouNoMes();
            })
        },
        //FUNÇÃO TESTE
        getAllJaPagouNoMes() {
            axios.get(`${this.URL}/recebimentoatrasados/${this.mesAno}`).then(response => {
                this.pago = response.data
                this.listaEmAtrasos();
            })
        },
        listaEmAtrasos(){
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
            this.qtdeAtrasados = this.atrasados.length
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
            this.diaDaSemana = data.toLocaleString('pt-BR', {weekday: 'long'})
        },
    },
    mounted(){
        this.pegarDataAtual();
        this.getAllAlunosMensalidade();
        this.getQtdeAlunos();
        this.getQtdeTreinos();
    },
}
</script>

<style>
    #card1{
        text-align: center;
        background-color: rgb(92, 152, 255);
    }
    #card2{
        text-align: center;
        background-color: rgb(130, 92, 255);
    }
    #card3{
        text-align: center;
        background-color: rgb(255, 179, 92);
    }
</style>