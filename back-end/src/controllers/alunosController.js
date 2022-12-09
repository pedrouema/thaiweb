const alunosModel = require('../models/alunosModel');

const getAll = async (req, res) => {
    const aluno = await alunosModel.getAll();
    return res.status(200).json(aluno);
};

module.exports = {
    getAll
};