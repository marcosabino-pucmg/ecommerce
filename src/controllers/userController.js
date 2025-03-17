import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const { email, nome, cel, senha } = req.body;

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10); // 10 é o número de rounds de criptografia

    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email,
        nome,
        cel,
        senha: senhaCriptografada, // Salva a senha criptografada
      },
    });

    // Remove a senha da resposta
    const userSemSenha = { ...user, senha: undefined };

    res.status(201).json(userSemSenha); // Retorna o usuário sem a senha
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
};

// Listar usuários
export const getUsers = async (req, res) => {
  try {
    let where = {}; // Objeto para armazenar os filtros

    // Adiciona filtros ao objeto "where" se os query parameters existirem
    if (req.query.nome) {
      where.nome = { contains: req.query.nome }; // Busca parcial pelo nome
    }
    if (req.query.email) {
      where.email = { contains: req.query.email }; // Busca parcial pelo email
    }

    // Busca os usuários com os filtros aplicados (ou sem filtros, se nenhum for fornecido)
    const users = await prisma.user.findMany({
      where, // Passa o objeto "where" para o Prisma
    });

    // Remove a senha de cada usuário
    const usersSemSenha = users.map(user => {
      return { ...user, senha: undefined };
    });

    res.status(200).json(usersSemSenha); // Retorna os usuários sem a senha
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
};


// Atualizar usuário
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.User.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        nome: req.body.nome,
        cel: req.body.cel,
        senha: req.body.senha,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
};

// Deletar usuário
export const deleteUser = async (req, res) => {
  
    await prisma.User.delete({
      where: { id: req.params.id },
    });
    res.status(200).send({message:"usuário deletado com sucesso"});
  
  }