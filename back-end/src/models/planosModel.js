const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const planos = await connection.query('SELECT * FROM planos');
        return planos.rows;
    }finally{
        connection.end();
    }
};

const addPlano = async (newPlano) => {
    const {  nome_plano, valor_plano } = newPlano;
    let sql = 'INSERT INTO Planos ("nome_plano", "valor_plano") VALUES('
    sql+="'"+newPlano.nome_plano+"'"+','+"'"+newPlano.valor_plano+"')"
    let createPlano;
    try{
        connection.connect();
        createPlano = await connection.query(sql)
        return createPlano;
    }finally{
        connection.end();
    }
};

const deletePlano = async (id) => {
    let sql = 'DELETE FROM planos WHERE id_plano = '+id;
    let removePlano;
    try{
        connection.connect();
        removePlano = await connection.query(sql)
        return removePlano.rowCount;
    }finally{
        connection.end();
    }
};

const updatePlano = async (id, plano) => {
    const { nome_plano, valor_plano } = plano;
    let sql = 'UPDATE planos SET nome_plano='+"'"+nome_plano+"',"+
    ' valor_plano='+"'"+valor_plano+"'"+
    ' WHERE id_plano = '+id;
    console.log(sql);
    let updatePlano;
    try{ 
        connection.connect();
        updatePlano = await connection.query(sql)
        return updatePlano;
    }finally{
        connection.end();
    }
};

module.exports = {
    getAll,
    addPlano,
    deletePlano,
    updatePlano,
};