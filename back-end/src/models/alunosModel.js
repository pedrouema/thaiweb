const connection = require ('./connection')

const db = require("./database");

const getQtdeMes = async (mesAtual, anoAtual) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            COUNT (*)
            FROM alunos 
            WHERE EXTRACT(MONTH FROM diapag_aluno) = '${mesAtual}'
            AND EXTRACT(YEAR FROM diapag_aluno) = '${anoAtual}'
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTotalAlunos = async (nome_aluno) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            COUNT (*)
            FROM alunos 
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getNome = async (nome_aluno) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno,
            EXTRACT (DAY FROM diapag_aluno) as diapag_format,
            p.nome_plano, 
            p.valor_plano,
            p.tipo_mensal
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            WHERE UPPER(a.nome_aluno) LIKE UPPER('%${nome_aluno}%')
            AND a.ativo_aluno = true
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getOne = async (id_aluno) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.datanasc_aluno, 'DD/MM/YYYY') as datanasc_aluno, 
            to_char(a.datanasc_aluno, 'yyyy-MM-dd') as datanasc_formatada, 
            to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno,
            to_char(a.diapag_aluno, 'yyyy-MM-dd') as diapag_formatada,
            p.id_plano, t.id_turma 
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            WHERE a.id_aluno = ${id_aluno}
        `);  
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
            p.nome_plano, 
            t.nome_turma,
            to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno 
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            WHERE a.ativo_aluno = true
            ORDER BY a.nome_aluno
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

// RETORNA TODOS ALUNOS QUE O PLANO SEJA MENSALIDADE
const getAllMensalidade = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.datanasc_aluno, 'DD/MM/YYYY') as datanasc_aluno, 
            p.nome_plano,
            p.valor_plano,   
            t.nome_turma,
            to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno, 
            EXTRACT (DAY FROM diapag_aluno) as diapag_format
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            WHERE p.tipo_mensal = true
            ORDER BY a.id_aluno
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

// TESTANDO AQUI
const getAllMensalidadesAtrasadas = async (dataAtual) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            a.id_aluno, 
            a.nome_aluno, 
            a.cpf_aluno, 
            to_char(a.datanasc_aluno, 'DD/MM/YYYY') as datanasc_aluno, 
            p.nome_plano, 
            t.nome_turma,
            to_char(a.diapag_aluno, 'DD/MM/YYYY') as diapag_aluno, 
            EXTRACT (DAY FROM diapag_aluno) as diapag_format
            FROM ALUNOS a
            INNER JOIN planos p on p.id_plano = a.id_plano
            INNER JOIN turmas t on t.id_turma = a.id_turma
            WHERE p.tipo_mensal = true
            ORDER BY a.nome_aluno
        `);  
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addAluno = async (newAluno) => {
    const { nome_aluno, cpf_aluno, datanasc_aluno, id_plano, id_turma, diapag_aluno  } = newAluno;
    let sql = `INSERT INTO alunos ("nome_aluno", "cpf_aluno", "datanasc_aluno", "id_plano", "id_turma", "diapag_aluno") 
               VALUES('${nome_aluno}','${cpf_aluno}', '${datanasc_aluno}', ${id_plano}, ${id_turma}, '${diapag_aluno}')`;
    let createAluno;
    try{
        createAluno = await db.query(sql)
        return createAluno;
    }catch(err){
        console.log(err);
    }
};

const deleteAluno = async (id, aluno) => {
    const { ativo_aluno } = aluno
    let sql = 'UPDATE alunos SET ativo_aluno='+"'"+ativo_aluno+"'"+ 
    ' WHERE id_aluno = '+id;
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
    getNome,
    getAllMensalidade,
    getAllMensalidadesAtrasadas,
    getTotalAlunos,
    getQtdeMes,
};