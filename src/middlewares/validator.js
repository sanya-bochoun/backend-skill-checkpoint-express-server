import { body, param, query, validationResult } from 'express-validator';

// Validation middleware สำหรับสร้างคำถาม
export const validateCreateQuestion = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  
  // Middleware สำหรับตรวจสอบผลลัพธ์การ validate
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid request data.',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validation middleware สำหรับอัปเดตคำถาม
export const validateUpdateQuestion = [
  param('questionId')
    .isInt()
    .withMessage('Question ID must be an integer'),
  
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  
  body('description')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('category')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  
  // Middleware สำหรับตรวจสอบผลลัพธ์การ validate
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid request data.',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validation middleware สำหรับสร้างคำตอบ
export const validateCreateAnswer = [
  param('questionId')
    .isInt()
    .withMessage('Question ID must be an integer'),
  
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Content must be between 5 and 1000 characters'),
  
  // Middleware สำหรับตรวจสอบผลลัพธ์การ validate
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid request data.',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validation middleware สำหรับการโหวต
export const validateVote = [
  param('questionId')
    .isInt()
    .withMessage('Question ID must be an integer'),
  
  body('vote')
    .isInt({ min: -1, max: 1 })
    .withMessage('Vote must be -1 (downvote) or 1 (upvote)'),
  
  // Middleware สำหรับตรวจสอบผลลัพธ์การ validate
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid vote value.',
        errors: errors.array() 
      });
    }
    next();
  }
];

// Validation middleware สำหรับการค้นหาคำถาม
export const validateSearchQuestions = [
  query('title')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title search must be between 2 and 100 characters'),
  
  query('category')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category search must be between 2 and 50 characters'),
  
  // Middleware สำหรับตรวจสอบผลลัพธ์การ validate
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Invalid search parameters.',
        errors: errors.array() 
      });
    }
    next();
  }
]; 