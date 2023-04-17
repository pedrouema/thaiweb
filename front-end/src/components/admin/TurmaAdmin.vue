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
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="inputZip" class="form-label">Selecione o horario de inicio do treino</label>
                <select class="form-select" v-model="hrtreino">
                    <option value="08:00">08:00</option>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
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
            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" v-model="seg"/>
            <label class="form-check-label" for="inlineCheckbox1">Segunda</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" v-model="ter"/>
            <label class="form-check-label" for="inlineCheckbox2">Terça</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" v-model="qua"/>
            <label class="form-check-label" for="inlineCheckbox3">Quarta</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" v-model="qui"/>
            <label class="form-check-label" for="inlineCheckbox4">Quinta</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="option5" v-model="sex"/>
            <label class="form-check-label" for="inlineCheckbox5">Sexta</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="inlineCheckbox6" value="option6" v-model="sab" />
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
                    <th scope="col">Nome da Turma</th>
                    <th scope="col">Horario</th>
                    <th scope="col">Dia(s)</th>
                    <th scope="col">Instrutor</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="turma in turmas" :key="turma.id_turma">
                    <th scope="row">{{ turma.nome_turma+' '+turma.qtdesemanal_turma+'x' }}</th>
                    <td>{{ turma.horario_turma }}</td>
                    <td>{{ turma.dias_turma }}</td>
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
            editar: false,

            hrtreino: '',
            qtdeSemana: '',
            seg: false,
            ter: false,
            qua: false,
            qui: false,
            sex: false,
            sab: false,
            dias: '',
        }
    },
    methods: {
        getAllTurmas() {
            axios.get(`${this.URL}/turmas`).then(response => {
                this.turmas = response.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        createTurma() {
            if(this.seg)
                    this.dias = ' Segunda'
            if(this.ter)
                this.dias = this.dias+ ' Terça'
            if(this.qua)
                this.dias = this.dias+ ' Quarta'
            if(this.qui)
                this.dias = this.dias+ ' Quinta'
            if(this.sex)
                this.dias = this.dias+ ' Sexta'
            if(this.sab)
                this.dias = this.dias+ ' Sábado'
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor,
                qtdesemanal_turma: this.qtdeSemana,
                horario_turma: this.hrtreino,
                segunda: this.seg,
                terca: this.ter,
                quarta: this.qua,
                quinta: this.qui,
                sexta: this.sex,
                sabado: this.sab,
                dias_turma: this.dias
            }
            axios.post(`${this.URL}/turmas`, turma).then(response => {
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
                this.qtdeSemana = turma.qtdesemanal_turma
                this.hrtreino = turma.horario_turma
                this.seg = turma.segunda
                this.ter = turma.terca
                this.qua = turma.quarta
                this.qui = turma.quinta
                this.sex = turma.sexta
                this.sab = turma.sabado
            })
        },
        salvarDados(){
            if(this.seg)
                this.dias = ' Segunda'
            if(this.ter)
                this.dias = this.dias+ ' Terça'
            if(this.qua)
                this.dias = this.dias+ ' Quarta'
            if(this.qui)
                this.dias = this.dias+ ' Quinta'
            if(this.sex)
                this.dias = this.dias+ ' Sexta'
            if(this.sab)
                this.dias = this.dias+ ' Sábado'
            const turma = {
                nome_turma: this.nome,
                id_instrutor: this.instrutor,
                qtdesemanal_turma: this.qtdeSemana,
                horario_turma: this.hrtreino,
                segunda: this.seg,
                terca: this.ter,
                quarta: this.qua,
                quinta: this.qui,
                sexta: this.sex,
                sabado: this.sab,
                dias_turma: this.dias
            }
            console.log(turma);
            axios.put(`${this.URL}/turmas/${this.turmaId}`, turma).then(response => {
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
            })
        },
        limpaDadosFormulario(){
            this.turmaId = 0;
            this.nome = '';
            this.instrutorId = 0;
            this.instrutor = 0;
            this.editar = false;
            this.hrtreino = '';
            this.qtdeSemana = '';
            this.seg = false;
            this.ter = false;
            this.qua = false;
            this.qui = false;
            this.sex = false;
            this.sab = false;
            this.dias = '';
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