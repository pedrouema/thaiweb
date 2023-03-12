const despesasModel = require("../models/despesasModel");

const getAll = async (req, res) => {
    const despesas = await despesasModel.getAll();
    return res.status(200).json(despesas);
};

const getAllDespesasQuitadas = async (req, res) => {
    const despesas = await despesasModel.getAllDespesasQuitadas();
    return res.status(200).json(despesas);
};

const getNaoQuitadaEntreDatas = async (req, res) => {
    const dataIni = req.params.dataIni
    const dataFim = req.params.dataFim
    const despesas = await despesasModel.getNaoQuitadaEntreDatas(dataIni, dataFim);
    return res.status(200).json(despesas);
};

const getQuitadaEntreDatas = async (req, res) => {
    const dataIni = req.params.dataIni
    const dataFim = req.params.dataFim
    const despesas = await despesasModel.getQuitadaEntreDatas(dataIni, dataFim);
    return res.status(200).json(despesas);
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const despesa = await despesasModel.getOne(id);
    return res.status(200).json(despesa);
};

const addDespesa = async (req, res) => {
    const createDespesa = await despesasModel.addDespesa(req.body);
    return res.status(201).json(createDespesa);
};

const updateDespesa = async (req, res) => {
    const { id } = req.params;
    await despesasModel.updateDespesa(id, req.body);
    return res.status(204).json();
};

const quitarDespesa = async (req, res) => {
    const { id } = req.params;
    await despesasModel.quitarDespesa(id, req.body);
    return res.status(204).json();
};

const voltarDespesa = async (req, res) => {
    const { id } = req.params;
    await despesasModel.voltarDespesa(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getOne,
    addDespesa,
    updateDespesa,
    quitarDespesa,
    getAllDespesasQuitadas,
    voltarDespesa,
    getNaoQuitadaEntreDatas,
    getQuitadaEntreDatas,
}