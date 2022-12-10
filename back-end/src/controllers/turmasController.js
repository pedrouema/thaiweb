const turmasModel = require('../models/turmasModel');

const getAll = async (req, res) => {
    const turmas = await turmasModel.getAll();
    return res.status(200).json(turmas);
};

const addTurma = async (req, res) => {
    const createTurma = await turmasModel.addTurma(req.body);
    return res.status(201).json(createTurma);
};

const deleteTurma = async (req, res) => {
    const { id } = req.params;
    await turmasModel.deleteTurma(id);
    return res.status(204).json();
};

const updateTurma = async (req, res) => {
    const { id } = req.params;
    await turmasModel.updateTurma(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    addTurma,
    deleteTurma,
    updateTurma,
};