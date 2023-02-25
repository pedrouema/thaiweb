const connection = require ('./connection')

const db = require("./database");

const getAll = async () =>{
    try{
        const despesas = await db.query(`
        SELECT
        d.id_despesa,
        d.nome_despesa,
        d.valor_despesa,
        to_char(d.vencimento_despesa, 'DD/MM/YYYY') as vencimento_despesa,
        d.quitada_despesa
        FROM DESPESAS d
        WHERE d.quitada_despesa != true
        ORDER BY d.vencimento_despesa
        `);
        return despesas.rows;
    }catch(err){
        console.log(err);
    }
}

const getOne = async (id_despesa) => {
    try{
        const { rows } = await db.query(`
        SELECT 
        d.id_despesa,
        d.nome_despesa,
        d.valor_despesa,
        to_char(d.vencimento_despesa, 'DD/MM/YYYY') as vencimento_despesa, 
        to_char(d.vencimento_despesa, 'yyyy-MM-dd') as vencimento_despesa_formatada
        FROM DESPESAS d
        WHERE d.id_despesa = ${id_despesa}
        `)
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}

const addDespesa = async (newDespesa) => {
    const { nome_despesa, valor_despesa, vencimento_despesa } = newDespesa;
    let sql = `INSERT INTO despesas ("nome_despesa", "valor_despesa", "vencimento_despesa") 
               VALUES('${nome_despesa}','${valor_despesa}', '${vencimento_despesa}')`;
    let createDespesa;
    try{
        createDespesa = await db.query(sql)
        return createDespesa;
    }catch(err){
        console.log(err);
    }
};

const updateDespesa = async (id, despesa) => {
    const { nome_despesa, valor_despesa, vencimento_despesa } = despesa;
    let sql = 'UPDATE despesas SET nome_despesa='+"'"+nome_despesa+"',"+
    ' valor_despesa='+"'"+valor_despesa+"',"+
    ' vencimento_despesa='+"'"+vencimento_despesa+"'"+
    ' WHERE id_despesa = '+id;
    let updateDespesa;
    try{ 
        updateDespesa = await db.query(sql)
        return updateDespesa;
    }catch(err){
        console.log(err);
    }
};

const quitarDespesa = async (id, despesa) => {
    const { quitada_despesa } = despesa;
    let sql = 'UPDATE despesas SET quitada_despesa='+quitada_despesa+
    ' WHERE id_despesa = '+id;
    let quitarDespesa;
    try{ 
        quitarDespesa = await db.query(sql)
        return quitarDespesa;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addDespesa,
    updateDespesa,
    quitarDespesa,
}