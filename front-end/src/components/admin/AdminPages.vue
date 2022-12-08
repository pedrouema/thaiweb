<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Outros" />
            <div class=" admin-pages-tabs">
                <nav class="nav">
                    <a class="nav-link active" aria-current="page" href="#">Aluno</a>
                    <a class="nav-link" href="#">Instrutor</a>
                    <a class="nav-link" href="#">Plano de Treino</a>
                    <a class="nav-link" href="#">Turma</a>
                </nav>
            </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import AlunoAdmin from './AlunoAdmin.vue';
import InstrutorAdmin from './InstrutorAdmin.vue';
import PlanoTreinoAdmin from './PlanoTreinoAdmin.vue';
import TurmaAdmin from './TurmaAdmin.vue';

export default {
    name: 'AdminPages',
    components: { PageTitle, AlunoAdmin, InstrutorAdmin, PlanoTreinoAdmin, TurmaAdmin},
}
</script>

<style>

</style>