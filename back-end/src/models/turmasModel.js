const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const turmas = await connection.query('SELECT * FROM turmas');
        return turmas.rows;
    }finally{
        connection.end();
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
    }finally{
        connection.end();
    }
    
};


module.exports = {
    getAll,
    addTurma,
};