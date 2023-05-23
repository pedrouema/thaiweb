<template>
    <h2>Quantidade de novos alunos nos ultimos meses</h2>
    <div style="position: relative; height: 45vh; width: 70vw">
        <canvas id="myChartAlunos"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';
;

export default {
    name: 'AnalisesAlunos',
    data(){
        return {
            URL: "http://localhost:4000",
            meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            mesesUsar: [],
            qtdeAlunos: [],
        }
    },
    methods: {
        alimentarDadosQtde(){
            let qtde
            let mes = parseFloat(this.mesAtual)
            let ano = parseFloat(this.anoAtual)
            for(let i = 6; i >= 0; i--)
            {
                axios.get(`${this.URL}/alunosquantidademes/${mes}/${ano}`).then(response => {
                    qtde = response.data[0].count;
                    if(qtde == null)
                        qtde = 0;
                    this.qtdeAlunos[i] = qtde
                })
                .catch(error => {
                    console.log(error);
                })
                mes--;
                if(mes == 0)
                {
                    mes = 12;
                    ano--;
                }
            }
        },
        filtraMeses(){
            let mes = this.mesAtual-1
            for(let i = 0; i < 7; i++)
            {
                if(mes == -1)
                    mes = this.meses.length - 1
                this.mesesUsar.push(this.meses[mes])
                mes--;
            }
            let aux = [];
            for(let i = this.mesesUsar.length - 1; i >= 0; i--)
                aux.push(this.mesesUsar[i])
            this.mesesUsar = aux;
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
    mounted() {
        this.pegarDataAtual();
        this.filtraMeses();
        this.alimentarDadosQtde();


        const data = {
            labels: this.mesesUsar,
            datasets: [{
                label: 'Novos Alunos',
                data: this.qtdeAlunos,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.2
            }]
        };

        const config = {
            type: 'line',
            data: data,
        };

        const ctx = document.getElementById('myChartAlunos');
        const myChartAlunos = new Chart(ctx, config);
        myChartAlunos;
    }
}
</script>

<style>

</style>

