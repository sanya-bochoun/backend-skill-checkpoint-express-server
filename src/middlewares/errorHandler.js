// Middleware สำหรับจัดการ error ที่ไม่ได้ถูกจัดการ
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // ตรวจสอบประเภทของ error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Invalid request data.',
      errors: err.errors
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: err.message || 'Resource not found.'
    });
  }

  if (err.name === 'DatabaseError') {
    return res.status(500).json({
      message: 'Database error occurred.'
    });
  }

  // Default error
  return res.status(500).json({
    message: 'Internal server error.'
  });
};

// Middleware สำหรับจัดการ 404 Not Found
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found.'
  });
};

// Middleware สำหรับจัดการ async errors
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error classes
export class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
} 