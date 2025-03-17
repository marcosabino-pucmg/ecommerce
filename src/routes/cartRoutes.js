import express from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cartController.js';

const router = express.Router();

// Rotas para o carrinho
router.post('/carrinho', addToCart); // Adicionar produto ao carrinho
router.get('/carrinho/:usuarioId', getCart); // Listar itens do carrinho de um usuário
router.put('/carrinho/:id', updateCartItem); // Atualizar quantidade de um item no carrinho
router.delete('/carrinho/:id', removeCartItem); // Remover item do carrinho

export default router;