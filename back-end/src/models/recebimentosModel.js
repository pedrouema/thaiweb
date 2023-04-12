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

const getAllRecebidas = async () =>{
    try{
        const recebido = await db.query(`
        SELECT
        r.id_mensalidade,
        to_char(r.data_recebimento, 'DD/MM/YYYY') as data_recebimento,
        r.valor_recebimento,
        a.nome_aluno,
        a.cpf_aluno
        FROM pagamentos_recebidos r
        INNER JOIN alunos a on a.id_aluno = r.id_aluno
        ORDER BY r.data_recebimento DESC
        `);
        return recebido.rows;
    }catch(err){
        console.log(err);
    }
}

const getRecebidasEntreDatas = async (dataIni, dataFim) => {
    try{
        const recebidas = await db.query(`
        SELECT
        r.id_mensalidade,
        to_char(r.data_recebimento, 'DD/MM/YYYY') as data_recebimento,
        r.valor_recebimento,
        a.nome_aluno,
        a.cpf_aluno
        FROM pagamentos_recebidos r
        INNER JOIN alunos a on a.id_aluno = r.id_aluno
        WHERE r.data_recebimento >= '${dataIni}'
        and r.data_recebimento <= '${dataFim}'
        ORDER BY r.data_recebimento DESC;
        `)
        return recebidas.rows;
    }catch(err){
        console.log(err);
    }
}

const deleteRecebimento = async (id) => {
    let sql = 'DELETE FROM pagamentos_recebidos WHERE id_mensalidade = '+id;
    let removeRecebimento;
    try{
        removeRecebimento = await db.query(sql)
        return removeRecebimento.rowCount;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    createPagamentoRecebido,
    getAllRecebidas,
    getRecebidasEntreDatas,
    deleteRecebimento,
}