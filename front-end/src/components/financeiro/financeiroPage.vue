<template>
    <div class="cronograma-page">
        <PageTitle icon="fa fa-money" main="Financeiro"
            sub="Finanças & Outros" />

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
                    v-on:click="clickDespesa()">
                    <i class="fa fa-dollar"></i> Despesas Lançar & Quitar</a>
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
                    v-on:click="clickMensalidade()">
                    <i class="fa fa-calendar-o"></i> Gerenciamento de Mensalidades</a>
                </li>
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex1-content">
                <div
                    class="tab-pane fade" v-bind:class="classShowActiveDespesa"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <LancarDespesa />
                </div>
                <div 
                    class="tab-pane fade" v-bind:class="classShowActiveMensalidade"
                    id="ex1-tabs-2" 
                    role="tabpanel" 
                    aria-labelledby="ex1-tab-2">
                    <Mensalidade />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import LancarDespesa from './lancarDespesa.vue'
    import Mensalidade from './mensalidade.vue'

    export default{
        name: 'FinanceiroPage',
        components: { PageTitle, LancarDespesa, Mensalidade },
        data(){
            return{
                classShowActiveDespesa: ' show active',
                classShowActiveMensalidade: '',
            }
        },
        methods: {
            clickDespesa(){
                this.classShowActiveDespesa = ' show active'
                this.classShowActiveMensalidade = ''
            },
            clickMensalidade(){
                this.classShowActiveDespesa = ''
                this.classShowActiveMensalidade = ' show active'
            },
        }
    }
</script>

<style>

</style>