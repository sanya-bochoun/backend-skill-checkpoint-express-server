# Express Server Template

## 📝 รายละเอียดโปรเจค
โปรเจคนี้เป็น Express Server Template ที่ใช้สำหรับสร้าง API endpoints สำหรับระบบถาม-ตอบ (Q&A) โดยมีฟีเจอร์หลักๆ ดังนี้:
- การจัดการคำถาม (Questions)
- การจัดการคำตอบ (Answers)
- ระบบโหวต (Voting)
- ระบบค้นหา (Search)
- API Documentation ด้วย Swagger

## 🛠️ เทคโนโลยีที่ใช้
- Node.js
- Express.js
- PostgreSQL
- Swagger UI (สำหรับ API Documentation)
- Nodemon (สำหรับ development)

## 📦 การติดตั้ง
1. Clone โปรเจค:
```bash
git clone <repository-url>
```

2. ติดตั้ง dependencies:
```bash
npm install
```

3. ตั้งค่าฐานข้อมูล PostgreSQL:
- สร้างฐานข้อมูลใหม่
- อัพเดทการเชื่อมต่อในไฟล์ `utils/db.mjs`

4. รันเซิร์ฟเวอร์:
```bash
npm start
```

## 🌐 การเข้าถึง
- API Server: http://localhost:5000
- Swagger Documentation: http://localhost:5000/api-docs
- Test Route: http://localhost:5000/test

## 🏗️ โครงสร้างโปรเจค
```
├── app.mjs              # จุดเริ่มต้นของแอพพลิเคชัน
├── controllers/         # ไฟล์ควบคุมการทำงานของ API
│   ├── questionController.js  # จัดการคำถาม
│   └── answerController.js    # จัดการคำตอบ
├── middleware/         # Middleware functions
│   └── validator.js    # ตรวจสอบความถูกต้องของข้อมูล
├── migrations/         # ไฟล์สำหรับจัดการฐานข้อมูล
├── routes/            # ไฟล์กำหนด routes
│   ├── questionRoutes.js
│   └── answerRoutes.js
├── utils/            # ฟังก์ชันช่วยเหลือต่างๆ
│   ├── db.mjs       # การเชื่อมต่อฐานข้อมูล
│   └── swagger.mjs  # การตั้งค่า Swagger
├── API.md           # เอกสาร API
└── package.json     # ไฟล์กำหนดค่าโปรเจค
```

## 🔌 API Endpoints

### คำถาม (Questions)
- `GET /api/questions` - ดึงข้อมูลคำถามทั้งหมด
- `GET /api/questions/:id` - ดึงข้อมูลคำถามตาม ID
- `POST /api/questions` - สร้างคำถามใหม่
- `PUT /api/questions/:id` - อัพเดทคำถาม
- `DELETE /api/questions/:id` - ลบคำถาม
- `GET /api/questions/search` - ค้นหาคำถามตามหัวข้อหรือหมวดหมู่
- `POST /api/questions/:id/vote` - โหวตคำถาม (1 หรือ -1)

### คำตอบ (Answers)
- `GET /api/questions/:questionId/answers` - ดึงคำตอบทั้งหมดของคำถาม
- `POST /api/questions/:questionId/answers` - สร้างคำตอบใหม่ (ไม่เกิน 300 ตัวอักษร)
- `PUT /api/questions/:questionId/answers/:id` - แก้ไขคำตอบ
- `DELETE /api/questions/:questionId/answers/:id` - ลบคำตอบ
- `POST /api/questions/:questionId/answers/:id/vote` - โหวตคำตอบ (1 หรือ -1)

## 🔒 การตรวจสอบข้อมูล (Validation)
### คำถาม
- หัวข้อ: 5-100 ตัวอักษร
- รายละเอียด: 10-1000 ตัวอักษร
- หมวดหมู่: ต้องอยู่ในรายการที่กำหนด ['ทั่วไป', 'การเขียนโปรแกรม', 'ฐานข้อมูล', 'เครือข่าย', 'อื่นๆ']

### คำตอบ
- เนื้อหา: ไม่เกิน 300 ตัวอักษร

## 🔍 ระบบค้นหา
- ค้นหาคำถามตามหัวข้อ
- ค้นหาคำถามตามหมวดหมู่
- รองรับการค้นหาแบบ case-insensitive

## 📚 API Documentation
- Swagger UI: http://localhost:5000/api-docs
- รายละเอียดเพิ่มเติมในไฟล์ [API.md](API.md)

## 🔒 การจัดการข้อผิดพลาด
- 400 Bad Request - ข้อมูลไม่ถูกต้อง (เช่น ความยาวเกินกำหนด, หมวดหมู่ไม่ถูกต้อง)
- 404 Not Found - ไม่พบข้อมูลที่ต้องการ
- 500 Internal Server Error - เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์

## 🔄 การพัฒนาต่อ
- รันด้วย Nodemon สำหรับ auto-reload ในโหมด development
- ใช้ ESM (ES Modules) แทน CommonJS
- รองรับ CORS และ form data
- ใช้ Connection Pool สำหรับการจัดการการเชื่อมต่อฐานข้อมูล


