<template>
    <div class="aluno-admin">
        <h3>Gerênciamento de Aluno</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome</label>
                <input type="text" class="form-control" placeholder="Digite Nome do Aluno">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF</label>
                <input type="text" class="form-control" id="inputZip">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="inputZip">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Plano</label>
                <select id="inputState" class="form-select">
                    <option selected>Individual</option>
                    <option>Turma</option>
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
    name: 'AlunoAdmin',
}
</script>

<style>

</style>