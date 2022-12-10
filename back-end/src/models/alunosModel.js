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
    sql+="'"+nome_aluno+"'"+','+"'"+cpf_aluno+"'"+","+"'"+dataNasc_aluno+"'"+","+"'"+diaPag_aluno+"')"
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

const updateAluno = async (id, aluno) => {
    const { nome_aluno, cpf_aluno, dataNasc_aluno, diaPag_aluno } = aluno;
    let sql = 'UPDATE alunos SET nome_aluno='+"'"+nome_aluno+"',"+
    ' cpf_aluno='+"'"+cpf_aluno+"',"+
    ' dataNasc_aluno='+"'"+dataNasc_aluno+"',"+
    ' diaPag_aluno='+"'"+diaPag_aluno+"'"+
    ' WHERE id_aluno = '+id;
    console.log(sql);
    let updateAluno;
    try{ 
        connection.connect();
        updateAluno = await connection.query(sql)
        return updateAluno;
    }finally{
        connection.end();
    }
};


// Exemplo de busca( search ) para filtrar alunos
// const getOneAluno = async (aluno) => {
//     const { nome_aluno } = aluno;
//     let sql = 'SELECT * FROM alunos WHERE nome_aluno = '+nome;
//     let removeAluno;
//     try{
//         connection.connect();
//         removeAluno = await connection.query(sql)
//         return removeAluno.rowCount;
//     }finally{
//         connection.end();
//     }
// };

module.exports = {
    getAll,
    addAluno,
    deleteAluno,
    updateAluno,
    //getOneAluno,
};