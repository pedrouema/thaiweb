<template>
    <div>
        <h3>Gerenciamento de Despesas</h3>
        <br/>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Despesa</label>
                <input type="text" class="form-control" placeholder="ex: Energia">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor da Despesa</label>
                <input type="text" class="form-control" id="inputZip" placeholder="ex: 185.50">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Vencimento</label >
                <input type="date" class="form-control" id="inputZip">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createDespesa()" v-show="!editar">+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDespesa()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Despesa</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data Vencimento</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            
        </table>
    </div>
</template>

<script>
export default {
    name: 'LancarDespesa',

}
</script>

<style>

</style>