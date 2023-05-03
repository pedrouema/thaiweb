const express = require('express');
const alunosController = require('./controllers/alunosController');
const instrutoresController = require('./controllers/instrutoresController');
const planosController = require('./controllers/planosController');
const turmasController = require('./controllers/turmasController');
const adminsController = require('./controllers/adminsController');
const despesasController = require('./controllers/despesasController');
const cronogramaController = require('./controllers/cronogramaController');
const recebimentosController = require('./controllers/recebimentosController');

const router = express.Router();

//ROTAS DE ADMINS
router.get('/admins', adminsController.getAll)
router.get('/admins/getone/:id', adminsController.getOne)
router.post('/admins', adminsController.addAdmin)
router.post('/admins/valid', adminsController.getValido)

// ROTAS DE ALUNOS
router.get('/alunos', alunosController.getAll)
router.get('/alunos/getone/:id', alunosController.getOne)
router.get('/alunos/getnome/:nome_aluno', alunosController.getNome)
router.post('/alunos', alunosController.addAluno)
router.delete('/alunos/delete/:id', alunosController.deleteAluno)
router.put('/alunos/:id', alunosController.updateAluno)
router.get('/alunostotal', alunosController.getTotalAlunos)

// ROTAS DE INSTRUTORES
router.get('/instrutores', instrutoresController.getAll)
router.get('/instrutores/getone/:id', instrutoresController.getOne)
router.post('/instrutores', instrutoresController.addInstrutor)
router.delete('/instrutores/delete/:id', instrutoresController.deleteInstrutor)
router.put('/instrutores/:id', instrutoresController.updateInstrutor)
router.get('/instrutores/options', instrutoresController.getAllOptions)

// ROTAS DE PLANOS
router.get('/planos', planosController.getAll)
router.get('/planos/getone/:id', planosController.getOne)
router.post('/planos', planosController.addPlano)
router.delete('/planos/delete/:id', planosController.deletePlano)
router.put('/planos/:id', planosController.updatePlano)
router.get('/planos/options', planosController.getAllOption)

// ROTAS DE TURMAS
router.get('/turmas', turmasController.getAll)
router.get('/turmas/getone/:id', turmasController.getOne)
router.post('/turmas', turmasController.addTurma)
router.delete('/turmas/delete/:id', turmasController.deleteTurma)
router.put('/turmas/:id', turmasController.updateTurma)
router.get('/turmas/options', turmasController.getAllOptions)

// ROTAS DE FINANCEIRO
router.get('/despesas', despesasController.getAll)
router.get('/despesasquitadas', despesasController.getAllDespesasQuitadas)
router.get('/despesasquitadasentredatas/:dataIni/:dataFim', despesasController.getQuitadaEntreDatas)
router.get('/despesasnaoquitadasentredatas/:dataIni/:dataFim', despesasController.getNaoQuitadaEntreDatas)
router.get('/despesas/getone/:id', despesasController.getOne)
router.post('/despesas', despesasController.addDespesa)
router.put('/despesas/:id', despesasController.updateDespesa)
router.put('/despesas/quitar/:id', despesasController.quitarDespesa)
router.put('/despesas/voltar/:id', despesasController.voltarDespesa)

// ROTAS DE CRONOGRAMA
router.get('/cronogramasegunda', cronogramaController.getTurmasSegunda)
router.get('/cronogramaterca', cronogramaController.getTurmasTerca)
router.get('/cronogramaquarta', cronogramaController.getTurmasQuarta)
router.get('/cronogramaquinta', cronogramaController.getTurmasQuinta)
router.get('/cronogramasexta', cronogramaController.getTurmasSexta)
router.get('/cronogramasabado', cronogramaController.getTurmasSabado)
router.get('/cronogramaqtdesegunda', cronogramaController.getQtdeSegunda)
router.get('/cronogramaqtdeterca', cronogramaController.getQtdeTerca)
router.get('/cronogramaqtdequarta', cronogramaController.getQtdeQuarta)
router.get('/cronogramaqtdequinta', cronogramaController.getQtdeQuinta)
router.get('/cronogramaqtdesexta', cronogramaController.getQtdeSexta)
router.get('/cronogramaqtdesabado', cronogramaController.getQtdeSabado)


// ROTAS PAGAMENTO RECEBIDOS (MENSALIDADES)
router.post('/recebimentos', recebimentosController.createPagamentoRecebido)
router.get('/getallrecebidas', recebimentosController.getAllRecebidas)
router.get('/recebidasentredatas/:dataIni/:dataFim', recebimentosController.getRecebidasEntreDatas)
router.delete('/recebimento/delete/:id', recebimentosController.deleteRecebimento)

// ROTAS MENSALIDADES ATRASADAS
router.get('/alunosmensalidade', alunosController.getAllMensalidade)
router.get('/recebimentoatrasadas/:mesAtual', recebimentosController.getAtrasados)
router.get('/recebimentoatrasados/:mesAno', recebimentosController.getAtrasadosTeste)

module.exports = router;