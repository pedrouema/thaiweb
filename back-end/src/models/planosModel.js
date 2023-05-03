const connection = require ('./connection')
const db = require("./database");

const getAll = async () => {  
    try{
        const planos = await db.query('SELECT * FROM planos ORDER BY id_plano DESC');
        return planos.rows;
    }catch(err){
        console.log(err);
    }
};

const getOne = async (id_plano) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            id_plano, 
            nome_plano, 
            valor_plano,
            tipo_mensal,
            tipo_avulso,
            tipo_plano 
            FROM PLANOS 
            WHERE id_plano = ${id_plano}
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addPlano = async (newPlano) => {
    const {  nome_plano, valor_plano, tipo_mensal, tipo_avulso, tipo_plano } = newPlano;
    let sql = 'INSERT INTO planos ("nome_plano", "valor_plano", "tipo_mensal", "tipo_avulso", "tipo_plano") VALUES('
    sql+="'"+nome_plano+"'"+','+"'"+valor_plano+"'"+","+"'"+tipo_mensal+"'"+","+"'"+tipo_avulso+"'"+","+"'"+tipo_plano+"')"
    let createPlano;
    try{
        createPlano = await db.query(sql)
        return createPlano;
    }catch(err){
        console.log(err);
    }
};

const deletePlano = async (id) => {
    let sql = 'DELETE FROM planos WHERE id_plano = '+id;
    let removePlano;
    try{
        removePlano = await db.query(sql)
        return removePlano.rowCount;
    }catch(err){
        console.log(err);
    }
};

const updatePlano = async (id, plano) => {
    const { nome_plano, valor_plano, tipo_mensal, tipo_avulso, tipo_plano } = plano;
    let sql = 'UPDATE planos SET nome_plano='+"'"+nome_plano+"',"+
    ' valor_plano='+"'"+valor_plano+"',"+
    ' tipo_mensal='+"'"+tipo_mensal+"',"+
    ' tipo_avulso='+"'"+tipo_avulso+"',"+
    ' tipo_plano='+"'"+tipo_plano+"'"+
    ' WHERE id_plano = '+id;
    let updatePlano;
    try{ 
        updatePlano = await db.query(sql)
        return updatePlano;
    }catch(err){
        console.log(err);
    }
};

const getAllOption = async () => {  
    try{
        const planos = await db.query('SELECT * FROM planos');
        return planos.rows;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addPlano,
    deletePlano,
    updatePlano,
    getAllOption,
};