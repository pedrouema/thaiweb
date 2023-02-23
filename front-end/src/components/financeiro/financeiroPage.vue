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
                    aria-selected="false">
                    <i class="fa fa-dollar"></i> Despesas Lançar & Quitar</a>
                </li>
                
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex1-content">
                <div
                    class="tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <LancarDespesa />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import LancarDespesa from './lancarDespesa.vue'

    export default{
        name: 'FinanceiroPage',
        components: { PageTitle, LancarDespesa }
    }
</script>

<style>

</style>