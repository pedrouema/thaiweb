const db = require("./database");

const createPagamentoRecebido = async (newPagamento) => {
    const { valor_recebimento, data_recebimento, id_aluno } = newPagamento;
    let sql = `INSERT INTO pagamentos_recebidos ("valor_recebimento", "data_recebimento", "id_aluno") 
               VALUES('${valor_recebimento}','${data_recebimento}', '${id_aluno}')`;
    let createRecebimento;
    try{
        createRecebimento = await db.query(sql)
        return createRecebimento;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    createPagamentoRecebido,
}