const cronogramaModel = require("../models/cronogramaModel")

const getTurmasSegunda = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasSegunda();
    return res.status(200).json(turmas);
};

const getTurmasTerca = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasTerca();
    return res.status(200).json(turmas);
};

const getTurmasQuarta = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasQuarta();
    return res.status(200).json(turmas);
};

const getTurmasQuinta = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasQuinta();
    return res.status(200).json(turmas);
};

const getTurmasSexta = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasSexta();
    return res.status(200).json(turmas);
};

const getTurmasSabado = async (req, res) => {
    const turmas = await cronogramaModel.getTurmasSabado();
    return res.status(200).json(turmas);
};

const getQtdeSegunda = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeSegunda();
    return res.status(200).json(turmas);
};

const getQtdeTerca = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeTerca();
    return res.status(200).json(turmas);
};

const getQtdeQuarta = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeQuarta();
    return res.status(200).json(turmas);
};

const getQtdeQuinta = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeQuinta();
    return res.status(200).json(turmas);
};

const getQtdeSexta = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeSexta();
    return res.status(200).json(turmas);
};

const getQtdeSabado = async (req, res) => {
    const turmas = await cronogramaModel.getQtdeSabado();
    return res.status(200).json(turmas);
};

module.exports = {
    getTurmasSegunda,
    getTurmasTerca,
    getTurmasQuarta,
    getTurmasQuinta,
    getTurmasSexta,
    getTurmasSabado,
    getQtdeSegunda,
    getQtdeTerca,
    getQtdeQuarta,
    getQtdeQuinta,
    getQtdeSexta,
    getQtdeSabado,
}