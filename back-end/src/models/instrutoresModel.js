const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const instrutores = await connection.query('SELECT * FROM instrutores');
        return instrutores.rows;
    }finally{
        connection.end();
    }
};

const addInstrutor = async (newInstrutor) => {
    const {  nome_instrutor, cpf_instrutor } = newInstrutor;
    let sql = 'INSERT INTO instrutores ("nome_instrutor", "cpf_instrutor") VALUES('
    sql+="'"+newInstrutor.nome_instrutor+"'"+','+"'"+newInstrutor.cpf_instrutor+"')"
    let createInstrutor;
    try{
        connection.connect();
        createInstrutor = await connection.query(sql)
        return createInstrutor;
    }finally{
        connection.end();
    }
};

const deleteInstrutor = async (id) => {
    let sql = 'DELETE FROM instrutores WHERE id_instrutor = '+id;
    let removeInstrutor;
    try{
        connection.connect();
        removeInstrutor = await connection.query(sql)
        return removeInstrutor.rowCount;
    }finally{
        connection.end();
    }
};

module.exports = {
    getAll,
    addInstrutor,
    deleteInstrutor,
};