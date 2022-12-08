<template>
    <div class="turma-admin">
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Turma</label>
                <input type="text" class="form-control" placeholder="exemplo: Turma 18:00">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Instrutor</label>
                <select id="inputState" class="form-select">
                    <option selected>Rafael Teixeira</option>
                </select>
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'TurmaAdmin',
}
</script>

<style>

</style>