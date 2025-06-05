import express from 'express';
import { addPassword, getPasswords, deletePassword, updatePassword } from '../controllers/passwords.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addPassword);
router.get('/', getPasswords);
router.delete('/:id', deletePassword);
router.put('/:id', updatePassword);

export default router;
