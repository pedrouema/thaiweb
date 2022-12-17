const adminsModel = require('../models/adminsModel');

const getAll = async (req, res) => {
    const admins = await adminsModel.getAll();
    return res.status(200).json(admins);
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const admin = await adminsModel.getOne(id);
    return res.status(200).json(admin);
};

const getValido = async (req, res) => {
    const admin = await adminsModel.getValido(req.body);
    return res.status(200).json(admin);
};

const addAdmin = async (req, res) => {
    const createAdmin = await adminsModel.addAdmin(req.body);
    return res.status(201).json(createAdmin);
};

module.exports = {
    getAll,
    getOne,
    addAdmin,
    getValido,
}