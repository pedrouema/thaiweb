<template>
    <div>
        <h3>Gerenciamento de Mensalidades</h3>
        <div class=" cronograma-page-tabs">
            <!-- Tabs navs -->
            <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-1"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-1"
                    role="tab"
                    aria-controls="ex1-tabs-1"
                    aria-selected="true"
                    v-on:click="clickReceber()">
                    <i class="fa fa-money"></i> Receber Mensalidade</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-2"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-2"
                    role="tab"
                    aria-controls="ex1-tabs-2"
                    aria-selected="true"
                    v-on:click="clickAtrasados()">
                    <i class="fa fa-warning"></i> Mensalidades atrasadas</a>
                </li>
                <li class="nav-item" role="presentation">
                    <a
                    class="nav-link"
                    id="ex1-tab-3"
                    data-mdb-toggle="tab"
                    href="#ex1-tabs-3"
                    role="tab"
                    aria-controls="ex1-tabs-3"
                    aria-selected="true"
                    v-on:click="clickVerRecebidas()">
                    <i class="fa fa-eye"></i> Ver Mensalidades Recebidas</a>
                </li>
            </ul>
            <!-- Tabs navs -->
            <!-- Tabs content -->
            <div class="tab-content" id="ex1-content">
                <div
                    class="tab-pane fade" v-bind:class="classShowActiveReceber"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1">
                    <ReceberMensalidade />
                </div>
                <div
                    class="tab-pane fade" v-bind:class="classShowActiveAtrasados"
                    id="ex1-tabs-2"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-2">
                    <MensalidadesAtrasadas />
                </div>
                <div
                    class="tab-pane fade" v-bind:class="classShowActiveVerRecebidas"
                    id="ex1-tabs-3"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-3">
                    <VerMensalidadesRecebidas />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReceberMensalidade from './receberMensalidade.vue'
import MensalidadesAtrasadas from './mensalidadesAtrasadas.vue'
import VerMensalidadesRecebidas from './verMensalidadesRecebidas.vue'

export default {
    name: 'Mensalidade',
    components: { ReceberMensalidade, MensalidadesAtrasadas, VerMensalidadesRecebidas },
    data(){
        return {
            URL: "http://localhost:4000",
            classShowActiveReceber: ' show active',
            classShowActiveAtrasados: '',
            classShowActiveVerRecebidas: '',
        }
    },
    methods: {
        clickReceber(){
            this.classShowActiveReceber = ' show active'
            this.classShowActiveAtrasados = ''
            this.classShowActiveVerRecebidas = ''
        },
        clickAtrasados(){
            this.classShowActiveReceber = ''
            this.classShowActiveAtrasados = ' show active'
            this.classShowActiveVerRecebidas = ''
        },
        clickVerRecebidas(){
            this.classShowActiveReceber = ''
            this.classShowActiveAtrasados = ''
            this.classShowActiveVerRecebidas = ' show active'
        }
    },
    mounted() {
        
    }
}
</script>

<style>

</style>