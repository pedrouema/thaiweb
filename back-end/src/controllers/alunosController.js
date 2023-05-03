const alunosModel = require('../models/alunosModel');

const getTotalAlunos = async (req, res) => {
    const alunos = await alunosModel.getTotalAlunos();
    return res.status(200).json(alunos);
};

const getAll = async (req, res) => {
    const alunos = await alunosModel.getAll();
    return res.status(200).json(alunos);
};

const getAllMensalidade = async (req, res) => {
    const alunos = await alunosModel.getAllMensalidade();
    return res.status(200).json(alunos);
};

const getNome = async (req, res) => {
    const nome_aluno = req.params.nome_aluno;
    const aluno = await alunosModel.getNome(nome_aluno);
    return res.status(200).json(aluno);
};

const getOne = async (req, res) => {
    const id = req.params.id;
    const aluno = await alunosModel.getOne(id);
    return res.status(200).json(aluno);
};

const addAluno = async (req, res) => {
    const createAluno = await alunosModel.addAluno(req.body);
    return res.status(201).json(createAluno);
};

const deleteAluno = async (req, res) => {
    const { id } = req.params;

    await alunosModel.deleteAluno(id);
    return res.status(204).json();
};

const updateAluno = async (req, res) => {
    const { id } = req.params;

    await alunosModel.updateAluno(id, req.body);
    return res.status(204).json();
};

module.exports = {
    getAll,
    getOne,
    addAluno,
    deleteAluno,
    updateAluno,
    getNome,
    getAllMensalidade,
    getTotalAlunos,
};