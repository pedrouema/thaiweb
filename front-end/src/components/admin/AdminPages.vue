<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-list-alt" main="Gerenciamento de Cadastros"
            sub="Cadastros & Outros" />
            
        <div class=" admin-pages-tabs">
            <!-- Tabs navs -->
            <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="ex1-tab-1" data-mdb-toggle="tab" href="#ex1-tabs-1" role="tab"
                        aria-controls="ex1-tabs-1" aria-selected="true" v-on:click="clickAluno()">Aluno</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="ex1-tab-2" data-mdb-toggle="tab" href="#ex1-tabs-2" role="tab"
                        aria-controls="ex1-tabs-2" aria-selected="true" v-on:click="clickInstrutor()">Instrutor</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="ex1-tab-3" data-mdb-toggle="tab" href="#ex1-tabs-3" role="tab"
                        aria-controls="ex1-tabs-3" aria-selected="false" v-on:click="clickPlano()">Plano de Treino</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a class="nav-link" id="ex1-tab-4" data-mdb-toggle="tab" href="#ex1-tabs-4" role="tab"
                        aria-controls="ex1-tabs-4" aria-selected="false" v-on:click="clickTurma()">Turma</a>
                </li>
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex1-content">
                <div class="tab-pane fade" v-bind:class="classShowActiveAluno" id="ex1-tabs-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                        <AlunoAdmin />
                </div>
                <div class="tab-pane fade" v-bind:class="classShowActiveInstrutor" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                    <InstrutorAdmin />
                </div>
                <div class="tab-pane fade" v-bind:class="classShowActivePlano" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                    <PlanoTreinoAdmin />
                </div>
                <div class="tab-pane fade" v-bind:class="classShowActiveTurma" id="ex1-tabs-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                    <TurmaAdmin />
                </div>
            </div>
            <!-- Tabs content -->
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
    data(){
        return{
        classShowActiveAluno: ' show active',
        classShowActiveInstrutor: '',
        classShowActivePlano: '',
        classShowActiveTurma: '',

        }
    },
    methods:{
        
        clickAluno(){
            this.classShowActiveAluno = ' show active'
            this.classShowActiveInstrutor = ''
            this.classShowActivePlano = ''
            this.classShowActiveTurma = ''
        },
        clickInstrutor(){
            this.classShowActiveAluno = ''
            this.classShowActiveInstrutor = ' show active'
            this.classShowActivePlano = ''
            this.classShowActiveTurma = ''
        },
        clickPlano(){
            this.classShowActiveAluno = ''
            this.classShowActiveInstrutor = ''
            this.classShowActivePlano = ' show active'
            this.classShowActiveTurma = ''
        },
        clickTurma(){
            this.classShowActiveAluno = ''
            this.classShowActiveInstrutor = ''
            this.classShowActivePlano = ''
            this.classShowActiveTurma = ' show active'
        }
    },
    
}
</script>

<style>

</style>