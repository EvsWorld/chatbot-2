import { Router } from 'express';
import * as repliesController from '../controllers/replies.controller';
import postSchema from './post-reply-input.schema.json';
import getSchema from './get-reply-input.schema.json';
import { schemaValidator } from '../middlewares/schema-validation.middleware';

const router = Router();

router.get('/', repliesController.handleGetReplies);
router.post('/', schemaValidator(postSchema), repliesController.create);
router.delete('/:id', repliesController.remove);

export default router;
