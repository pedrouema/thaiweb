const express = require('express');
const alunosController = require('./controllers/alunosController');
const instrutoresController = require('./controllers/instrutoresController');
const planosController = require('./controllers/planosController');
const turmasController = require('./controllers/turmasController');

const router = express.Router();


// ROTAS DE ALUNOS
router.get('/alunos', alunosController.getAll)
router.post('/alunos', alunosController.addAluno)
router.delete('/alunos/delete/:id', alunosController.deleteAluno)
router.put('/alunos/:id', alunosController.updateAluno)

// ROTAS DE INSTRUTORES
router.get('/instrutores', instrutoresController.getAll)
router.post('/instrutores', instrutoresController.addInstrutor)
router.delete('/instrutores/delete/:id', instrutoresController.deleteInstrutor)
router.put('/instrutores/:id', instrutoresController.updateInstrutor)

// ROTAS DE PLANOS
router.get('/planos', planosController.getAll)
router.post('/planos', planosController.addPlano)
router.delete('/planos/delete/:id', planosController.deletePlano)
router.put('/planos/:id', planosController.updatePlano)

// ROTAS DE TURMAS
router.get('/turmas', turmasController.getAll)
router.post('/turmas', turmasController.addTurma)
router.delete('/turmas/delete/:id', turmasController.deleteTurma)
router.put('/turmas/:id', turmasController.updateTurma)


module.exports = router;