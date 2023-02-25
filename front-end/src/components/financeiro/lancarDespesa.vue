<template>
    <div>
        <h3>Gerenciamento de Despesas</h3>
        <br/>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Despesa</label>
                <input type="text" class="form-control" placeholder="ex: Energia" v-model="nome">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Valor da Despesa</label>
                <input type="text" class="form-control" placeholder="ex: 185.50" v-model="valor">
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Data de Vencimento</label >
                <input type="date" class="form-control" v-model="dataVenc">
            </div>
            <div class="col-12">
                <button type="button" class="btn btn-primary" @click="createDespesa()" v-show="!editar">+ SALVAR</button>
                <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
                <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
            </div>
        </form>
    </div>
    <br/>
    <div class="alunos-table">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Despesa</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Data Vencimento</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="despesa in despesas" :key="despesa.id_despesa">
                    <th scope="row">{{ despesa.nome_despesa }}</th>
                    <td>R$ {{ despesa.valor_despesa.toFixed(2) }}</td>
                    <td>{{ despesa.vencimento_despesa }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosDespesa(despesa.id_despesa)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="quitarDespesa(despesa.id_despesa)">
                            <i class="fa fa-check"> </i>
                             Quitar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LancarDespesa',
    data(){
        return {
            URL: "http://localhost:4000",
            despesas: [],
            nome: '',
            valor: '',
            dataVenc: '',
            despesaId: 0,
            editar: false
        }
    },
    methods: {
        getAllDespesas() {
            axios.get(`${this.URL}/despesas`).then(response => {
                this.despesas = response.data
                console.log(this.despesas);
            })
            .catch(error => {
                console.log(error);
            })
        },
        createDespesa(){
            const despesa = {
                nome_despesa: this.nome,
                valor_despesa: this.valor,
                vencimento_despesa: this.dataVenc,
            }
            console.log(despesa);
            axios.post(`${this.URL}/despesas`, despesa).then(response => {
                console.log(response);
                this.getAllDespesas();
                
            })
            this.limpaDadosFormulario()
        },
        salvarDados(){
            const despesa = {
                nome_despesa: this.nome,
                valor_despesa: this.valor,
                vencimento_despesa: this.dataVenc,
            }
            console.log(despesa);
            axios.put(`${this.URL}/despesas/${this.despesaId}`, despesa).then(response => {
                console.log(response);
                this.getAllDespesas();
            });
            this.limpaDadosFormulario();
        },
        quitarDespesa(id){
            this.editar = true
            const despesa = {
                quitada_despesa: true,
            }
            axios.put(`${this.URL}/despesas/quitar/${id}`, despesa).then(response => {
                console.log(response);
                this.getAllDespesas();
            });
            this.limpaDadosFormulario();
        },
        carregarDadosDespesa(id){
            this.editar = true;
            axios.get(`${this.URL}/despesas/getone/`+id).then(response => {
                const despesa = response.data[0]
                this.despesaId = despesa.id_despesa
                this.nome = despesa.nome_despesa
                this.valor = despesa.valor_despesa
                this.dataVenc = despesa.vencimento_despesa_formatada
                console.log(response.data[0]);
            })
        },
        limpaDadosFormulario(){
            this.nome = '';
            this.valor = '',
            this.dataVenc = '';
            this.despesaId = 0;
            this.editar = false;
        }
    },
    mounted() {
        this.getAllDespesas();
    }
}
</script>

<style>

</style>