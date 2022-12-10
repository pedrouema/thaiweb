const express = require('express');
const alunosController = require('./controllers/alunosController');
const instrutoresController = require('./controllers/instrutoresController');
const planosController = require('./controllers/planosController');
const turmasController = require('./controllers/turmasController');

const router = express.Router();


// ROTAS DE ALUNOS
router.get('/alunos', alunosController.getAll)
router.post('/alunos', alunosController.addAluno)
router.delete('/alunos/:id', alunosController.deleteAluno)

// ROTAS DE INSTRUTORES
router.get('/instrutores', instrutoresController.getAll)
router.post('/instrutores', instrutoresController.addInstrutor)
router.delete('/instrutores/:id', instrutoresController.deleteInstrutor)

// ROTAS DE PLANOS
router.get('/planos', planosController.getAll)
router.post('/planos', planosController.addPlano)

// ROTAS DE TURMAS
router.get('/turmas', turmasController.getAll)
router.post('/turmas', turmasController.addTurma)


module.exports = router;