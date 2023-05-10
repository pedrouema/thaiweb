<template>
    <div class="cronograma-page">
        <PageTitle icon="fa fa-bar-chart " main="Análises Geral"
            sub="Análises & Estatísticas" />
            <div class=" cronograma-page-tabs">
            <!-- Tabs navs -->
            <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-1"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-1"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected="true"
                    v-on:click="clickAlunos()">
                    <i class="fa fa-graduation-cap"></i> Novos Alunos</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-2"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-2"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected="false"
                    v-on:click="clickGanhos()">
                    <i class="fa fa-money"></i> Últimos Ganhos</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-3"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-3"
                    role="tab"
                    aria-controls="ex1-tabs-3"
                    aria-selected="false"
                    v-on:click="clickBalanco()">
                    <i class="fa fa-balance-scale"></i> Balanço Financeiro</a>
                </li>
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex1-content">
                <div
                    class="tab-pane fade" v-bind:class="classShowActiveAlunos"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <AnalisesAlunos />
                </div>
                <div 
                    class="tab-pane fade" v-bind:class="classShowActiveGanhos"
                    id="ex1-tabs-2" 
                    role="tabpanel" 
                    aria-labelledby="ex1-tab-2">
                    <AnalisesGanhos />
                </div>
                <div 
                    class="tab-pane fade" v-bind:class="classShowActiveBalanco"
                    id="ex1-tabs-3" 
                    role="tabpanel" 
                    aria-labelledby="ex1-tab-3">
                    <AnalisesFinanceiro />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AnalisesAlunos from '@/components/analises/analisesAlunos'
    import AnalisesGanhos from '@/components/analises/analisesGanhos'
    import AnalisesFinanceiro from '@/components/analises/analisesFinanceiro'
    import PageTitle from '../template/PageTitle'

    export default{
        name: 'AnalisesPage',
        components: { PageTitle, AnalisesAlunos, AnalisesGanhos, AnalisesFinanceiro },
        data(){
            return{
                classShowActiveAlunos: ' show active',
                classShowActiveGanhos: '',
                classShowActiveBalanco: '',
            }
        },
        methods: {
            clickAlunos(){
                this.classShowActiveAlunos = ' show active'
                this.classShowActiveGanhos = ''
                this.classShowActiveBalanco = ''
            },
            clickGanhos(){
                this.classShowActiveAlunos = ''
                this.classShowActiveGanhos = ' show active'
                this.classShowActiveBalanco = ''
            },
            clickBalanco(){
                this.classShowActiveAlunos = ''
                this.classShowActiveGanhos = ''
                this.classShowActiveBalanco = ' show active'
            },
        },
    }
</script>

<style>

</style>