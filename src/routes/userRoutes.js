import express from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// Rotas para usuários
router.post('/usuarios', createUser);
router.get('/usuarios', getUsers);
router.put('/usuarios/:id', updateUser);
router.delete('/usuarios/:id', deleteUser);

export default router;