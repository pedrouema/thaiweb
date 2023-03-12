<template>
    <form class="form-inline">
        <h5>Busque pelo o nome do aluno que deseja receber!</h5>
        <div class="form-group mb-2">
            <label for="inputZip" class="form-label">Digite o nome do aluno</label >
            <input type="text" class="form-control" v-model="dataIni">
        </div>
        <button type="button" class="btn btn-primary" @click="buscarDespesas()">
            <i class="fa fa-search"></i> BUSCAR</button>
    </form>
</template>

<script>

export default {
    name: 'ReceberMensalidade',
    
}
</script>

<style>

</style>