const connection = require ('./connection')
const db = require("./database");


const getAll = async () => {  
    try{
        const instrutores = await db.query('SELECT * FROM instrutores ORDER BY id_instrutor DESC');
        return instrutores.rows;
    }catch(err){
        console.log(err);
    }
};

const getOne = async (id_instrutor) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            id_instrutor, 
            nome_instrutor, 
            cpf_instrutor 
            FROM INSTRUTORES 
            WHERE id_instrutor = ${id_instrutor}
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addInstrutor = async (newInstrutor) => {
    const {  nome_instrutor, cpf_instrutor } = newInstrutor;
    let sql = 'INSERT INTO instrutores ("nome_instrutor", "cpf_instrutor") VALUES('
    sql+="'"+nome_instrutor+"'"+','+"'"+cpf_instrutor+"')"
    let createInstrutor;
    try{
        createInstrutor = await db.query(sql)
        return createInstrutor;
    }catch(err){
        console.log(err);
    }
};

const deleteInstrutor = async (id) => {
    let sql = 'DELETE FROM instrutores WHERE id_instrutor = '+id;
    let removeInstrutor;
    try{
        removeInstrutor = await db.query(sql)
        return removeInstrutor.rowCount;
    }catch(err){
        console.log(err);
    }
};

const updateInstrutor = async (id, instrutor) => {
    const { nome_instrutor, cpf_instrutor } = instrutor;
    let sql = 'UPDATE instrutores SET nome_instrutor='+"'"+nome_instrutor+"',"+
    ' cpf_instrutor='+"'"+cpf_instrutor+"'"+
    ' WHERE id_instrutor = '+id;
    let updateInstrutor;
    try{ 
        updateInstrutor = await db.query(sql)
        return updateInstrutor;
    }catch(err){
        console.log(err);
    }
};

const getAllOptions = async () => {  
    try{
        const instrutor = await db.query('SELECT * FROM instrutores');
        return instrutor.rows;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addInstrutor,
    deleteInstrutor,
    updateInstrutor,
    getAllOptions,
};