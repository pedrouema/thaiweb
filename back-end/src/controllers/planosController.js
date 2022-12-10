const planosModel = require('../models/planosModel');

const getAll = async (req, res) => {
    const planos = await planosModel.getAll();
    return res.status(200).json(planos);
};

const addPlano = async (req, res) => {
    const createPlano = await planosModel.addPlano(req.body);
    return res.status(201).json(createPlano);
};

module.exports = {
    getAll,
    addPlano,
};