const connection = require ('./connection')


const getAll = async () => {  
    const aluno = await connection.execute('SELECT * FROM aluno');
    return aluno;
};

module.exports = {
    getAll
};