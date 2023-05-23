const usuarioModel = require('../models/usuarioModel');


const addUsuario = async (req, res) => {
    const createUsuario = await usuarioModel.addUsuario(req.body);
    return res.status(201).json(createUsuario);
};

const login = async (req, res) => {
    const login = await usuarioModel.login(req.body);
    return res.status(201).json(login);
};

const updateUsuario = async (req, res) => {
    await usuarioModel.updateUsuario(req.body);
    return res.status(204).json();
};

module.exports = {
    addUsuario,
    login,
    updateUsuario,
}