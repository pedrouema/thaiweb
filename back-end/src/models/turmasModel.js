const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const turmas = await connection.query('SELECT * FROM turmas');
        return turmas.rows;
    }catch(err){
        console.log(err);
    }
};

const addTurma = async (newTurma) => {
    const { nome_turma } = newTurma;
    let sql = 'INSERT INTO turmas ("nome_turma") VALUES('
    sql+="'"+newTurma.nome_turma+"')"
    let createTurma;
    try{
        connection.connect();
        createTurma = await connection.query(sql)
        return createTurma;
    }catch(err){
        console.log(err);
    }
};

const deleteTurma = async (id) => {
    let sql = 'DELETE FROM turmas WHERE id_turma = '+id;
    let removeTurma;
    try{
        connection.connect();
        removeTurma = await connection.query(sql)
        return removeTurma.rowCount;
    }catch(err){
        console.log(err);
    }
};

const updateTurma = async (id, turma) => {
    const { nome_turma } = turma;
    let sql = 'UPDATE turmas SET nome_turma='+"'"+nome_turma+"'"+
    ' WHERE id_turma = '+id;
    console.log(sql);
    let updateTurma;
    try{ 
        connection.connect();
        updateTurma = await connection.query(sql)
        return updateTurma;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    addTurma,
    deleteTurma,
    updateTurma,
};