const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const instrutores = await connection.query('SELECT * FROM instrutores');
        return instrutores.rows;
    }catch(err){
        console.log(err);
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
    }catch(err){
        console.log(err);
    }
};

const deleteInstrutor = async (id) => {
    let sql = 'DELETE FROM instrutores WHERE id_instrutor = '+id;
    let removeInstrutor;
    try{
        connection.connect();
        removeInstrutor = await connection.query(sql)
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
        connection.connect();
        updateInstrutor = await connection.query(sql)
        return updateInstrutor;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    addInstrutor,
    deleteInstrutor,
    updateInstrutor,
};