<template>
    <h3>Gerenciamento de Despesas</h3>
    <form class="row g-3">
        <h5>Selecione as datas inicio e fim para buscar as mensalidades recebidas.</h5>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Inicio</label >
            <input type="date" class="form-control" v-model="dataIni">
        </div>
        <div class="col-md-2">
            <label for="inputZip" class="form-label">Data Fim</label >
            <input type="date" class="form-control" v-model="dataFim">
        </div>
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="buscarDespesas()">
                <i class="fa fa-search"></i> BUSCAR</button>
        </div>
    </form>
</template>

<script>

export default {
    name: "VerMensalidadesRecebidas",

}
</script>

<style>

</style>