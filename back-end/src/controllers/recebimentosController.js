const recebimentosModel = require ('../models/recebimentosModel')

const createPagamentoRecebido = async (req, res) => {
    const createRecebimento = await recebimentosModel.createPagamentoRecebido(req.body);
    return res.status(201).json(createRecebimento);
};

module.exports = {
    createPagamentoRecebido,
}