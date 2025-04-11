import express from 'express';
import {
  getAnswersByQuestionId,
  createAnswer,
  updateAnswer,
  deleteAnswer
} from '../controllers/answerController.js';
import { validateAnswer } from '../middleware/validator.js';

const router = express.Router();

router.get('/question/:questionId', getAnswersByQuestionId);
router.post('/question/:questionId', validateAnswer, createAnswer);
router.put('/:id', validateAnswer, updateAnswer);
router.delete('/:id', deleteAnswer);

export default router; 