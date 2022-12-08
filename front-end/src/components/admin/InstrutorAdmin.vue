<template>
    <div class="instrutor-admin">
        <h3>Gerênciamento de Instrutores</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Instrutor</label>
                <input type="text" class="form-control" placeholder="Nome do Instrutor">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Instrutor</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
    <hr/>
    <InstrutoresTable />
</template>

<script>
import InstrutoresTable from './InstrutoresTable.vue';

export default {
    name: 'InstrutoresAdmin',
    components: { InstrutoresTable }
}
</script>

<style>

</style>