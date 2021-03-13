import { Router } from 'express';
import * as repliesController from '../controllers/replies.controller';

const router = Router();

router.get('/', repliesController.findAll);
router.get('/oneReply', repliesController.findOne);
router.post('/', repliesController.create);

export default router;
