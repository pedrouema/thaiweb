const express = require('express');
const alunosController = require('./controllers/alunosController');

const router = express.Router();

router.get('/aluno', alunosController.getAll)

module.exports = router;