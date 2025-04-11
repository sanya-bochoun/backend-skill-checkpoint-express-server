import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Questions & Answers API',
      version: '1.0.0',
      description: 'API สำหรับระบบถาม-ตอบ',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./controllers/*.js'], // path to the API docs
};

export const specs = swaggerJsdoc(options); 