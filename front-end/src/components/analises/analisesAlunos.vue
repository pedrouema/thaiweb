<template>
    <h2>Total de alunos nos ultimos meses</h2>
    <div style="position: relative; height: 45vh; width: 80vw">
        <canvas id="myChartAlunos"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'AnalisesAlunos',
    data(){
        return {
            URL: "http://localhost:4000",
        }
    },
    methods: {

    },
    mounted() {
        const data = {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [{
                label: 'Total de Alunos',
                data: [25, 28, 35, 45, 40, 32, 42, 48, ],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
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

