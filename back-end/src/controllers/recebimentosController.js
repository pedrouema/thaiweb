const recebimentosModel = require ('../models/recebimentosModel')

const createPagamentoRecebido = async (req, res) => {
    const createRecebimento = await recebimentosModel.createPagamentoRecebido(req.body);
    return res.status(201).json(createRecebimento);
};

const getAllRecebidas = async (req, res) => {
    const recebido = await recebimentosModel.getAllRecebidas();
    return res.status(200).json(recebido);
};

const getRecebidasEntreDatas = async (req, res) => {
    const dataIni = req.params.dataIni
    const dataFim = req.params.dataFim
    const recebidas = await recebimentosModel.getRecebidasEntreDatas(dataIni, dataFim);
    return res.status(200).json(recebidas);
};

const deleteRecebimento = async (req, res) => {
    const { id } = req.params;
    await recebimentosModel.deleteRecebimento(id);
    return res.status(204).json();
};

const getAtrasados = async (req, res) => {
    const mesAtual = req.params.mesAtual
    const recebidas = await recebimentosModel.getAtrasados(mesAtual);
    return res.status(200).json(recebidas);
};

module.exports = {
    createPagamentoRecebido,
    getAllRecebidas,
    getRecebidasEntreDatas,
    deleteRecebimento,
    getAtrasados,
}