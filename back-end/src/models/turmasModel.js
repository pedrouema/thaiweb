const connection = require ('./connection')
const db = require("./database");


const getAll = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor 
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            ORDER BY t.id_turma DESC
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getOne = async (id_turma) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.id_instrutor 
            FROM Turmas t
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.id_turma = ${id_turma}
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addTurma = async (newTurma) => {
    const { nome_turma, id_instrutor } = newTurma;
    let sql = 'INSERT INTO turmas ("nome_turma", "id_instrutor") VALUES('
    sql+="'"+nome_turma+"'"+','+"'"+id_instrutor+"')"
    let createTurma;
    try{
        createTurma = await db.query(sql)
        return createTurma;
    }catch(err){
        console.log(err);
    }
};

const deleteTurma = async (id) => {
    let sql = 'DELETE FROM turmas WHERE id_turma = '+id;
    let removeTurma;
    try{
        removeTurma = await db.query(sql)
        return removeTurma.rowCount;
    }catch(err){
        console.log(err);
    }
};

const updateTurma = async (id, turma) => {
    const { nome_turma, id_instrutor} = turma;
    let sql = 'UPDATE turmas SET nome_turma='+"'"+nome_turma+"',"+
    ' id_instrutor='+"'"+id_instrutor+"'"+
    ' WHERE id_turma = '+id;
    console.log(sql);
    let updateTurma;
    try{ 
        updateTurma = await db.query(sql)
        return updateTurma;
    }catch(err){
        console.log(err);
    }
};

const getAllOptions = async () => {  
    try{
        const turmas = await db.query('SELECT * FROM turmas');
        return turmas.rows;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addTurma,
    deleteTurma,
    updateTurma,
    getAllOptions,
};