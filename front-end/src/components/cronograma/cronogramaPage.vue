<template>
    <div class="cronograma-page">
        <PageTitle icon="fa fa-calendar" main="Cronograma"
            sub="Cronograma Semanal" />
        
        <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Segunda-Feira</h4>
                                <p class="card-text">Aqui terá as turmas e horarios!</p>
                                
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Terça-Feira</h4>
                                <p class="card-text">Aqui terá as turmas e horarios!</p>
                                
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Quarta-Feira</h4>
                                <p class="card-text">Aqui terá as turmas e horarios!</p>
                                
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Quinta-Feira</h4>
                                <p class="card-text">Aqui terá as turmas e horarios!</p>
                                
                            </div>
                        </div>
                    </th>
                    <th scope="col">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Sexta-Feira</h4>
                                <p class="card-text">Aqui terá as turmas e horarios!</p>
                                
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'

    export default{
        name: 'CronogramaPage',
        components: { PageTitle }
    }
</script>

<style>

</style>