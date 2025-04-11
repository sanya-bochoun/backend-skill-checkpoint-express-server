# Express Server Template

## 📝 รายละเอียดโปรเจค
โปรเจคนี้เป็น Express Server Template ที่ใช้สำหรับสร้าง API endpoints สำหรับระบบถาม-ตอบ (Q&A) โดยมีฟีเจอร์หลักๆ ดังนี้:
- การจัดการคำถาม (Questions)
- การจัดการคำตอบ (Answers)
- ระบบโหวต (Voting)

## 🛠️ เทคโนโลยีที่ใช้
- Node.js
- Express.js
- PostgreSQL
- Swagger UI (สำหรับ API Documentation)

## 📦 การติดตั้ง
1. ติดตั้ง dependencies:
```bash
npm install
```

2. รันเซิร์ฟเวอร์:
```bash
npm start
```

## 🏗️ โครงสร้างโปรเจค
```
├── app.mjs              # จุดเริ่มต้นของแอพพลิเคชัน
├── controllers/         # ไฟล์ควบคุมการทำงานของ API
├── middleware/         # Middleware functions
├── migrations/         # ไฟล์สำหรับจัดการฐานข้อมูล
├── routes/            # ไฟล์กำหนด routes
├── src/              # โค้ดหลักของแอพพลิเคชัน
├── utils/            # ฟังก์ชันช่วยเหลือต่างๆ
├── API.md           # เอกสาร API
└── package.json     # ไฟล์กำหนดค่าโปรเจค
```

## 🔌 API Endpoints

### คำถาม (Questions)
- `POST /questions` - สร้างคำถามใหม่
- `GET /questions` - ดึงข้อมูลคำถามทั้งหมด
- `GET /questions/:questionId` - ดึงข้อมูลคำถามตาม ID
- `PUT /questions/:questionId` - อัพเดทคำถาม
- `DELETE /questions/:questionId` - ลบคำถาม
- `GET /questions/search` - ค้นหาคำถาม

### คำตอบ (Answers)
- `POST /questions/:questionId/answers` - สร้างคำตอบใหม่
- `GET /questions/:questionId/answers` - ดึงข้อมูลคำตอบทั้งหมดของคำถาม
- `DELETE /questions/:questionId/answers` - ลบคำตอบทั้งหมดของคำถาม

### ระบบโหวต (Voting)
- `POST /questions/:questionId/vote` - โหวตคำถาม (upvote/downvote)

## 📚 API Documentation
รายละเอียดเพิ่มเติมเกี่ยวกับ API สามารถดูได้ที่ไฟล์ [API.md](API.md)

## 🔒 การจัดการข้อผิดพลาด
ระบบมีการจัดการข้อผิดพลาดในรูปแบบต่างๆ:
- 400 Bad Request - ข้อมูลที่ส่งมาไม่ถูกต้อง
- 404 Not Found - ไม่พบข้อมูลที่ต้องการ
- 500 Internal Server Error - เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์

## 🤝 การมีส่วนร่วม
หากต้องการมีส่วนร่วมในการพัฒนาโปรเจค สามารถทำได้โดย:
1. Fork โปรเจค
2. สร้าง branch ใหม่ (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request
