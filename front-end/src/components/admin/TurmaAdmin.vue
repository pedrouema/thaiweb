<template>
    <div class="turma-admin">
        <h3>Gerenciamento de Turma</h3>
        <form class="row g-3">
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Nome da Turma</label>
                <input type="text" class="form-control" placeholder="exemplo: Turma 18:00" v-model="nome">
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">Instrutor</label>
                <select class="form-select" v-model="instrutor">
                    <option value="">Selecione o Instrutor</option>
                    <option v-for="instrutor in instrutores" :key="instrutor.id_instrutor" v-bind:value="instrutor.id_instrutor">
                        {{ instrutor.nome_instrutor }}
                    </option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="inputZip" class="form-label">Selecione quantas vezes por semana</label>
                <select class="form-select" v-model="qtdeSemana">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="inputZip" class="form-label">Selecione o horario do inicio do treino</label>
                <select class="form-select" v-model="hrTreino">
                    <option value="8:00">8:00</option>
                    <option value="8:30">8:30</option>
                    <option value="9:00">9:00</option>
                    <option value="9:30">9:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                </select>
            </div>
        </form>
        <br/>
        <label for="inputZip" class="form-label">Selecione os dias de treino da turma: </label><br>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
            <label class="form-check-label" for="inlineCheckbox1">Segunda</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
            <label class="form-check-label" for="inlineCheckbox2">Terça</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
            <label class="form-check-label" for="inlineCheckbox3">Quarta</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
            <label class="form-check-label" for="inlineCheckbox4">Quinta</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" />
            <label class="form-check-label" for="inlineCheckbox5">Sexta</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" disabled />
            <label class="form-check-label" for="inlineCheckbox6">Sábado</label>
        </div>
        <br/>
        <br/>
        
        <div class="col-12">
            <button type="button" class="btn btn-primary" @click="createTurma()" v-show="!editar" >+ SALVAR</button>
            <button type="button" class="btn btn-primary" @click="salvarDados()" v-show="editar">+ EDITAR</button>
            <button  type="button" class="btn btn-danger" @click="limpaDadosFormulario()" >CANCELAR</button>
        </div>
    </div>
    <hr/>
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
                <tr v-for="turma in turmas" :key="turma.id_turma">
                    <th scope="row">{{ turma.id_turma }}</th>
                    <td>{{ turma.nome_turma }}</td>
                    <td>{{ turma.nome_instrutor }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="carregarDadosTurma(turma.id_turma)">
                            <i class="fa fa-pencil"> </i>
                             Editar
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteTurma(turma.id_turma)">
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
import axios from 'axios'


export default {
    name: 'TurmaAdmin',
    data(){
        return {
            URL: "http://localhost:4000",
            instrutores:[],
            turmas: [],
            turmaId: 0,
            nome: '',
            instrutorId: 0,
            instrutor: 0,
            editar: false
        }
    },
    methods: {
        getAllTurmas() {
            axios.get(`${this.URL}/turmas`).then(response => {
                this.turmas = response.data
                console.log(this.turmas);
            })
            .catch(error => {
                console.log(error);
            })
        },
        createTurma() {
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor
            }
            console.log(turma);
            axios.post(`${this.URL}/turmas`, turma).then(response => {
                console.log(response);
                this.getAllTurmas();
            });
            this.limpaDadosFormulario();
        },
        carregarDadosTurma(id){
            this.editar = true;
            axios.get(`${this.URL}/turmas/getone/`+id).then(response => {
                const turma = response.data[0]
                this.turmaId = turma.id_turma
                this.nome = turma.nome_turma
                this.instrutor = turma.id_instrutor
                console.log(response.data[0]);
            })
        },
        salvarDados(){
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor
            }
            console.log(turma);
            axios.put(`${this.URL}/turmas/${this.turmaId}`, turma).then(response => {
                console.log(response);
                this.getAllTurmas();
            });
            this.limpaDadosFormulario();
        },
        deleteTurma(id) {
            axios.delete(this.URL+"/turmas/delete/"+id).then(()=>{
                this.getAllTurmas()
            });
        },
        getAllInstrutoresOptions() {
            axios.get(`${this.URL}/instrutores/options`).then(response => {
                this.instrutores = response.data
                console.log(this.instrutores);
            })
        },
        limpaDadosFormulario(){
            this.turmaId = 0;
            this.nome = '';
            this.instrutorId = 0;
            this.instrutor = 0;
            this.editar = false;
        }
    },
    mounted() {
        this.getAllTurmas();
        this.getAllInstrutoresOptions();
    }
}
</script>

<style>
   
</style>