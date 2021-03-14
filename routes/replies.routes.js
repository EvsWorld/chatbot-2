import { Router } from 'express';
import * as repliesController from '../controllers/replies.controller';

const router = Router();

// router.get('/', repliesController.findAll);
router.get('/', repliesController.handleGetReplies);
router.post('/', repliesController.create);
router.delete('/:id', repliesController.remove);

export default router;
