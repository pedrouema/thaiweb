const connection = require ('./connection')


const getAll = async () => {  
    try{
        connection.connect();
        const alunos = await connection.query('SELECT * FROM alunos');
        return alunos.rows;
    }finally{
        connection.end();
    }
};

const addAluno = async (newAluno) => {
    const {  nome_aluno, cpf_aluno, dataNasc_aluno, diaPag_aluno } = newAluno;
    let sql = 'INSERT INTO alunos ("nome_aluno", "cpf_aluno", "dataNasc_aluno", "diaPag_aluno") VALUES('
    sql+="'"+newAluno.nome_aluno+"'"+','+"'"+newAluno.cpf_aluno+"'"+","+"'"+dataNasc_aluno+"'"+","+"'"+newAluno.diaPag_aluno+"')"
    let createAluno;
    try{
        connection.connect();
        createAluno = await connection.query(sql)
        return createAluno;
    }finally{
        connection.end();
    }
    
};

const deleteAluno = async (id) => {
    let sql = 'DELETE FROM alunos WHERE id_aluno = '+id;
    let removeAluno;
    try{
        connection.connect();
        removeAluno = await connection.query(sql)
        return removeAluno.rowCount;
    }finally{
        connection.end();
    }
};

module.exports = {
    getAll,
    addAluno,
    deleteAluno,
};