<template>
    <div class="instrutor-admin">
        <h3>Gerênciamento de Instrutor</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome</label>
                <input type="text" class="form-control" placeholder="Nome do Instrutor">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF</label>
                <input type="text" class="form-control" id="inputZip">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'InstrutoresAdmin',
}
</script>

<style>

</style>