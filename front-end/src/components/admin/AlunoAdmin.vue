<template>
    <div class="aluno-admin">
        <h3>Gerênciamento de Alunos</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome do Aluno</label>
                <input type="text" class="form-control" placeholder="Nome do Aluno">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">CPF do Aluno</label>
                <input type="text" class="form-control" id="inputZip" placeholder="123.456.789-10">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="inputZip">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Plano</label>
                <select id="inputState" class="form-select">
                    <option selected>Individual 3x</option>
                    <option>Turma 3x</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Turma</label>
                <select id="inputState" class="form-select">
                    <option selected>Individual 18:00</option>
                    <option>Individual 10:00</option>
                    <option>Turma 10:00</option>
                    <option>Turma 18:00</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Dia Limite de Pagamento</label>
                <input type="number" class="form-control" id="inputZip" placeholder="15">
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">+ Cadastrar</button>
            </div>
        </form>
    </div>
    <hr/>
    <AlunosTable />
</template>

<script>
import AlunosTable from './AlunosTable.vue';

export default {
    name: 'AlunoAdmin',
    components: { AlunosTable }
}
</script>

<style>

</style>