const db = require("./database");

const createPagamentoRecebido = async (newPagamento) => {
    const { mes_referente ,valor_recebimento, data_recebimento, id_aluno } = newPagamento;
    let sql = `INSERT INTO pagamentos_recebidos ("mes_referente", "valor_recebimento", "data_recebimento", "id_aluno") 
               VALUES('${mes_referente}','${valor_recebimento}','${data_recebimento}', '${id_aluno}')`;
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

const getAtrasados = async (mesAtual) =>{
    try{
        const recebido = await db.query(`
        SELECT
        r.id_mensalidade,
        to_char(r.data_recebimento, 'DD/MM/YYYY') as data_recebimento,
        r.valor_recebimento,
        r.mes_referente,
        a.id_aluno,
        a.nome_aluno,
        a.cpf_aluno,
        p.nome_plano,
        p.valor_plano,
        to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno,
        EXTRACT (DAY FROM diapag_aluno) as diapag_format
        FROM pagamentos_recebidos r
        INNER JOIN alunos a on a.id_aluno = r.id_aluno
        INNER JOIN planos p on p.id_plano = a.id_plano
        WHERE p.tipo_mensal = true
        and r.mes_referente <> '${mesAtual}'
        ORDER BY a.nome_aluno
        `);
        return recebido.rows;
    }catch(err){
        console.log(err);
    }
}

const getAtrasadosTeste = async (mesAno, diaAtual) =>{
    try{
        const recebido = await db.query(`
        SELECT
        r.id_mensalidade,
        to_char(r.data_recebimento, 'DD/MM/YYYY') as data_recebimento,
        r.valor_recebimento,
        r.mes_referente,
        a.id_aluno,
        a.nome_aluno,
        a.cpf_aluno,
        p.nome_plano,
        p.valor_plano,
        to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno,
        EXTRACT (DAY FROM a.diapag_aluno) as diapag_format
        FROM pagamentos_recebidos r
        INNER JOIN alunos a on a.id_aluno = r.id_aluno
        INNER JOIN planos p on p.id_plano = a.id_plano
        WHERE r.mes_referente = '${mesAno}'
        and p.tipo_mensal = true
        ORDER BY a.id_aluno
        `);
        return recebido.rows;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createPagamentoRecebido,
    getAllRecebidas,
    getRecebidasEntreDatas,
    deleteRecebimento,
    getAtrasados,
    getAtrasadosTeste,
}