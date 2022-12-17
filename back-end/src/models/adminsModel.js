const { Column } = require("pg-promise");
const db = require("./database");

const getAll = async () => {  
    try{
        const admins = await db.query('SELECT * FROM admin ORDER BY id_admin DESC');
        return admins.rows;
    }catch(err){
        console.log(err);
    }
};

const getOne = async (id_admin) => {  
    try{
        const { rows } = await db.query(`
            SELECT 
            id_admin, 
            usuario_admin, 
            senha_admin 
            FROM ADMIN 
            WHERE id_admin = ${id_admin}
        `);  
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
};

const addAdmin = async (newAdmin) => {
    const {  usuario_admin, senha_admin } = newAdmin;
    let sql = 'INSERT INTO admin ("usuario_admin", "senha_admin") VALUES('
    sql+="'"+usuario_admin+"'"+','+"'"+senha_admin+"')"
    let createAdmin;
    try{
        createAdmin = await db.query(sql)
        return createAdmin;
    }catch(err){
        console.log(err);
    }
};

const getValido = async (admin) => {  
     const {  usuario_admin, senha_admin } = admin;
     let sql = 'SELECT usuario_admin = '+"'"+usuario_admin+"' "+
     'FROM admin WHERE senha_admin = '+"'"+senha_admin+"'"  
     console.log(sql); 
     let validaAdmin; 
    try{
        validaAdmin = await db.query(sql);  
        console.log(validaAdmin.rows);
        return validaAdmin;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    getAll,
    getOne,
    addAdmin,
    getValido,
}