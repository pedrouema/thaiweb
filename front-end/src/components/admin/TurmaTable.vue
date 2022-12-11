<template>
    <div class="turma-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome da Turma</th>
                    <th scope="col">Instrutor</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <th scope="row">{{ id_turma }}</th>
                    <td>{{ nome_turma }}</td>
                    <td>{{ instrutor_turma }}</td>
                    <td>
                        <button type="button" class="btn btn-success">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger">
                            <i class="fa fa-trash"> </i>
                             Excluir
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
</template>

<script>
export default {
    name: 'TurmaTable',
    props: {
        id_turma: String,
        nome_turma: String,
        instrutor_turma: String,
    }
}
</script>

<style>

</style>