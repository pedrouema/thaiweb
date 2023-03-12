const express = require('express');
const alunosController = require('./controllers/alunosController');
const instrutoresController = require('./controllers/instrutoresController');
const planosController = require('./controllers/planosController');
const turmasController = require('./controllers/turmasController');
const adminsController = require('./controllers/adminsController');
const despesasController = require('./controllers/despesasController');

const router = express.Router();

//ROTAS DE ADMINS
router.get('/admins', adminsController.getAll)
router.get('/admins/getone/:id', adminsController.getOne)
router.post('/admins', adminsController.addAdmin)
router.post('/admins/valid', adminsController.getValido)

// ROTAS DE ALUNOS
router.get('/alunos', alunosController.getAll)
router.get('/alunos/getone/:id', alunosController.getOne)
router.post('/alunos', alunosController.addAluno)
router.delete('/alunos/delete/:id', alunosController.deleteAluno)
router.put('/alunos/:id', alunosController.updateAluno)

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

module.exports = router;