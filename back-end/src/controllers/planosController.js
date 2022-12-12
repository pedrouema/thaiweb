const planosModel = require('../models/planosModel');

const getAll = async (req, res) => {
    const planos = await planosModel.getAll();
    return res.status(200).json(planos);
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const plano = await planosModel.getOne(id);
    return res.status(200).json(plano);
};

const addPlano = async (req, res) => {
    const createPlano = await planosModel.addPlano(req.body);
    return res.status(201).json(createPlano);
};

const deletePlano = async (req, res) => {
    const { id } = req.params;
    await planosModel.deletePlano(id);
    return res.status(204).json();
};

const updatePlano = async (req, res) => {
    const { id } = req.params;
    await planosModel.updatePlano(id, req.body);
    return res.status(204).json();
};

const getAllOption = async (req, res) => {
    const planos = await planosModel.getAllOption();
    return res.status(200).json(planos);
};

module.exports = {
    getAll,
    getOne,
    addPlano,
    deletePlano,
    updatePlano,
    getAllOption,
};