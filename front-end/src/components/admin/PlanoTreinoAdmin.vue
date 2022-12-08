<template>
    <div class="plano-treino-admin">
        <h3>Gerênciamento de Planos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome</label>
                <input type="text" class="form-control" placeholder="Nome do Plano">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor Mensalidade</label>
                <input type="text" class="form-control" id="inputZip" placeholder="R$ 100,00">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'PlanoTreinoAdmin',
}
</script>

<style>

</style>