const connection = require ('./connection')

const db = require("./database");

const getOne = async (id_aluno) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.datanasc_aluno, 'DD/MM/YYYY') as datanasc_aluno, 
            to_char(a.datanasc_aluno, 'yyyy-MM-dd') as datanasc_formatada, 
            a.diapag_aluno,
            p.id_plano, t.id_turma 
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            WHERE a.id_aluno = ${id_aluno}
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getAll = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.datanasc_aluno, 'DD/MM/YYYY') as datanasc_aluno, 
            a.diapag_aluno,
            p.nome_plano, t.nome_turma 
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            ORDER BY a.id_aluno DESC
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addAluno = async (newAluno) => {
    const { nome_aluno, cpf_aluno, datanasc_aluno, diapag_aluno, id_plano, id_turma } = newAluno;
    let sql = `INSERT INTO alunos ("nome_aluno", "cpf_aluno", "datanasc_aluno", "diapag_aluno", "id_plano", "id_turma") 
               VALUES('${nome_aluno}','${cpf_aluno}', '${datanasc_aluno}', ${diapag_aluno}, ${id_plano}, ${id_turma})`;
    let createAluno;
    try{
        createAluno = await db.query(sql)
        return createAluno;
    }catch(err){
        console.log(err);
    }
};

const deleteAluno = async (id) => {
    let sql = 'DELETE FROM alunos WHERE id_aluno = '+id;
    let removeAluno;
    try{
        removeAluno = await db.query(sql)
        return removeAluno.rowCount;
    }catch(err){
        console.log(err);
    }
};

const updateAluno = async (id, aluno) => {
    const { nome_aluno, cpf_aluno, datanasc_aluno, diapag_aluno, id_plano, id_turma } = aluno;
    let sql = 'UPDATE alunos SET nome_aluno='+"'"+nome_aluno+"',"+
    ' cpf_aluno='+"'"+cpf_aluno+"',"+
    ' datanasc_aluno='+"'"+datanasc_aluno+"',"+
    'id_plano='+"'"+id_plano+"',"+
    'id_turma='+"'"+id_turma+"',"+
    ' diapag_aluno='+"'"+diapag_aluno+"'"+
    ' WHERE id_aluno = '+id;
    let updateAluno;
    try{ 
        updateAluno = await db.query(sql)
        return updateAluno;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addAluno,
    deleteAluno,
    updateAluno,
};