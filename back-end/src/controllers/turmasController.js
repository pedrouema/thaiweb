const turmasModel = require('../models/turmasModel');

const getAll = async (req, res) => {
    const turmas = await turmasModel.getAll();
    return res.status(200).json(turmas);
};

const addTurma = async (req, res) => {
    const createTurma = await turmasModel.addTurma(req.body);
    return res.status(201).json(createTurma);
};

module.exports = {
    getAll,
    addTurma,
};