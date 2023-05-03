const connection = require ('./connection')
const db = require("./database");


const getAll = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado,
            t.dias_turma
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            ORDER BY t.nome_turma
        `);  
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
            i.id_instrutor,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado,
            t.dias_turma 
            FROM Turmas t
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.id_turma = ${id_turma}
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addTurma = async (newTurma) => {
    const { nome_turma, id_instrutor, qtdesemanal_turma, horario_turma, segunda, terca, quarta, quinta, sexta, sabado, dias_turma } = newTurma;
    let sql = 'INSERT INTO turmas ("nome_turma", "id_instrutor", "qtdesemanal_turma", "horario_turma", "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "dias_turma") VALUES('
    sql+="'"+nome_turma+"'"+','+"'"+id_instrutor+"'"+','+"'"+qtdesemanal_turma+"'"+','+"'"+horario_turma+"'"+','+"'"+segunda+"'"+','+"'"+terca+"'"+','+"'"+quarta+"'"+','+"'"+quinta+"'"+','+"'"+sexta+"'"+','+"'"+sabado+"'"+','+"'"+dias_turma+"')"
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
    const { nome_turma, id_instrutor, qtdesemanal_turma, horario_turma, segunda, terca, quarta, quinta, sexta, sabado, dias_turma } = turma;
    let sql = 'UPDATE turmas SET nome_turma='+"'"+nome_turma+"',"+
    ' id_instrutor='+"'"+id_instrutor+"',"+
    ' qtdesemanal_turma='+"'"+qtdesemanal_turma+"',"+
    ' horario_turma='+"'"+horario_turma+"',"+
    ' segunda='+"'"+segunda+"',"+
    ' terca='+"'"+terca+"',"+
    ' quarta='+"'"+quarta+"',"+
    ' quinta='+"'"+quinta+"',"+
    ' sexta='+"'"+sexta+"',"+
    ' sabado='+"'"+sabado+"',"+
    ' dias_turma='+"'"+dias_turma+"'"+
    ' WHERE id_turma = '+id;
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