const instrutoresModel = require('../models/instrutoresModel');

const getAll = async (req, res) => {
    const instrutores = await instrutoresModel.getAll();
    return res.status(200).json(instrutores);
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const instrutor = await instrutoresModel.getOne(id);
    return res.status(200).json(instrutor);
};

const addInstrutor = async (req, res) => {
    const createInstrutor = await instrutoresModel.addInstrutor(req.body);
    return res.status(201).json(createInstrutor);
};

const deleteInstrutor = async (req, res) => {
    const { id } = req.params;
    await instrutoresModel.deleteInstrutor(id);
    return res.status(204).json();
};

const updateInstrutor = async (req, res) => {
    const { id } = req.params;
    await instrutoresModel.updateInstrutor(id, req.body);
    return res.status(204).json();
};

const getAllOptions = async (req, res) => {
    const instrutor = await instrutoresModel.getAllOptions();
    return res.status(200).json(instrutor);
};

module.exports = {
    getAll,
    getOne,
    addInstrutor,
    deleteInstrutor,
    updateInstrutor,
    getAllOptions,
};