const db = require("./database");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const SECRET = 'S3CRet_RT_F1gTH_C3nTer';

const addUsuario = async (newUsuario) => {
    let { usuario_nome, usuario_senha } = newUsuario;
    usuario_senha = await bcrypt.hash(usuario_senha, 10)
    let sql = `INSERT INTO usuarios ("usuario_nome", "usuario_senha") 
               VALUES('${usuario_nome}','${usuario_senha}')`;
    let createUsuario;
    try{
        createUsuario = await db.query(sql)
        return createUsuario;
    }catch(err){
        console.log(err);
    }
};

const validarUsuario = async (usuario) =>{
    let { usuario_nome, usuario_senha} = usuario;
    let sql = `SELECT * FROM usuarios
               WHERE usuario_nome = '${usuario_nome}'`;
    let usuarioBanco;
    try{
        usuarioBanco = await db.query(sql)
        if(usuarioBanco.rowCount > 0){
            let senhaHash = await bcrypt.compare(usuario_senha, usuarioBanco.rows[0].usuario_senha)
            if(senhaHash)
                return usuarioBanco.rows[0]
        }
        return false
    }catch(err){
        console.log(err);
    }
}

const login = async (usuario) =>{
    let { usuario_nome } = usuario;
    let usuarioBanco = await validarUsuario(usuario)
    if(usuarioBanco){
        const payload = {
            id: usuarioBanco.id_usuario,
            usuario: usuario_nome
        }
        const jwtToken = jwt.sign(payload, SECRET, {expiresIn:86400})
        return {success: true, token: jwtToken, usuario_nome: usuario_nome, acesso: usuarioBanco.acesso}
    }
    return {success: false, msg: 'Falha na autenticação, verifique seus dados!'}
}

const updateUsuario = async (Usuario) => {
    let { usuarioAtual, usuario_nome, usuario_senha } = Usuario;
    usuario_senha = await bcrypt.hash(usuario_senha, 10)
    let sql = `UPDATE usuarios SET usuario_nome = '${usuario_nome}', usuario_senha = '${usuario_senha}',
                acesso = 'true'
                WHERE usuario_nome = '${usuarioAtual}'
                AND acesso = 'false'`;
    let createUsuario;
    try{
        createUsuario = await db.query(sql)
        return createUsuario;
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    addUsuario,
    login,
    updateUsuario,
}

