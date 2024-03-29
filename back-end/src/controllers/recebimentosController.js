const recebimentosModel = require ('../models/recebimentosModel')

const getValorEntradaMes = async (req, res) => {
    const mesAtual = req.params.mesAtual
    const anoAtual = req.params.anoAtual
    const entrada = await recebimentosModel.getValorEntradaMes(mesAtual, anoAtual);
    return res.status(200).json(entrada);
};

const getValorEntrada = async (req, res) => {
    const dataIni = req.params.dataIni
    const dataFim = req.params.dataFim
    const entrada = await recebimentosModel.getValorEntrada(dataIni, dataFim);
    return res.status(200).json(entrada);
};

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

const getAtrasadosTeste = async (req, res) => {
    const mesAno = req.params.mesAno;
    //const diaAtual = req.params.diaAtual;
    const recebidas = await recebimentosModel.getAtrasadosTeste(mesAno);
    return res.status(200).json(recebidas);
};

module.exports = {
    createPagamentoRecebido,
    getAllRecebidas,
    getRecebidasEntreDatas,
    deleteRecebimento,
    getAtrasados,
    getAtrasadosTeste,
    getValorEntrada,
    getValorEntradaMes,
}