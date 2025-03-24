import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Criar uma nova venda e atualizar estoque
export const criarVenda = async (req, res) => {
  try {
    const { usuarioId, produtoId, quantidadeVendida } = req.body;

    // Verificar se o produto existe
    const produto = await prisma.product.findUnique({ where: { id: produtoId } });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Verificar se há estoque suficiente
    if (produto.estoque < quantidadeVendida) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    // Criar a venda
    const venda = await prisma.venda.create({
      data: {
        usuarioId,
        produtoId,
        quantidade: quantidadeVendida,
      },
    });

    // Atualizar o estoque do produto
    await prisma.product.update({
      where: { id: produtoId },
      data: { estoque: produto.estoque - quantidadeVendida },
    });

    res.status(201).json(venda);
  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ error: 'Erro ao registrar venda', details: error.message });
  }
};
