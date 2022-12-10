<template>
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Data Nascimento</th>
                    <th scope="col">Plano</th>
                    <th scope="col">Turma</th>
                    <th scope="col">Dia Pagamento</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr>
                    <th scope="row">{{ id_aluno }}</th>
                    <td>{{ nome_aluno }}</td>
                    <td>{{ cpf_aluno }}</td>
                    <td>{{ dataNasc_aluno }}</td>
                    <td>{{ plano_aluno }}</td>
                    <td>{{ turma_aluno }}</td>
                    <td>{{ diaPag_aluno }}</td>
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
    name: 'AlunosTable',
    props: {
        id_aluno: String,
        nome_aluno: String,
        cpf_aluno : String,
        dataNasc_aluno : String,
        plano_aluno : String,
        turma_aluno : String,
        diaPag_aluno : String,
    }
}
</script>

<style>

</style>