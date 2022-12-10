const connection = require ('./connection')


const getAll = async () => {  
    connection.connect();
    try{
        const planos = await connection.query('SELECT * FROM planos');
        return planos;
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
        return createPlano.rows;
    }finally{
        connection.end();
    }
    
};


module.exports = {
    getAll,
    addPlano,
};