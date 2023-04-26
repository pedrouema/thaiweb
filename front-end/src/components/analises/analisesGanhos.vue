<template>
    <h2>Ganhos dos ultimos meses</h2>
    <div style="position: relative; height: 45vh; width: 80vw">
        <canvas id="myChartGanhos"></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'AnalisesGanhos',
    data(){
        return {
            URL: "http://localhost:4000",
            ganhos: [1196.90, 1250.50, 1124.80, 1281.40, 1256.90, 1255.60, 1340.60]

        }
    },
    methods: {

    },
    mounted() {
        const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        datasets: [{
            label: 'Ganho Livre',
            data: this.ganhos,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                y: {
                    beginAtZero: true
                }
                }
            },
        };

        const ctx = document.getElementById('myChartGanhos');
        const myChartGanhos = new Chart(ctx, config);
        myChartGanhos;
    }
}
</script>


