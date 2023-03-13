const db = require("./database");

const getTurmasSegunda = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.segunda = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTurmasTerca = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.terca = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTurmasQuarta = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.quarta = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTurmasQuinta = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.quinta = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTurmasSexta = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.sexta = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const getTurmasSabado = async () => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            t.id_turma, 
            t.nome_turma, 
            i.nome_instrutor ,
            t.qtdesemanal_turma,
            t.horario_turma,
            t.segunda,
            t.terca,
            t.quarta,
            t.quinta,
            t.sexta,
            t.sabado
            FROM TURMAS t 
            INNER JOIN instrutores i on i.id_instrutor = t.id_instrutor
            WHERE t.sabado = true
            ORDER BY t.horario_turma;
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getTurmasSegunda,
    getTurmasTerca,
    getTurmasQuarta,
    getTurmasQuinta,
    getTurmasSexta,
    getTurmasSabado,
}