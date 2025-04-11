import express from 'express';
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  searchQuestions,
  voteQuestion
} from '../controllers/questionController.js';
import { validateQuestion } from '../middleware/validator.js';

const router = express.Router();

// ค้นหาคำถาม
router.get('/search', searchQuestions);

// GET /questions - ดึงข้อมูลคำถามทั้งหมด
router.get('/', getAllQuestions);

// GET /questions/:id - ดึงข้อมูลคำถามตาม ID
router.get('/:id', getQuestionById);

// POST /questions - สร้างคำถามใหม่
router.post('/', validateQuestion, createQuestion);

// PUT /questions/:id - อัปเดตคำถาม
router.put('/:id', validateQuestion, updateQuestion);

// DELETE /questions/:id - ลบคำถาม
router.delete('/:id', deleteQuestion);

// โหวตคำถาม
router.post('/:id/vote', voteQuestion);

export default router; 