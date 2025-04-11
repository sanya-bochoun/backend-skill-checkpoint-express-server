// ตรวจสอบข้อมูลคำถาม
export const validateQuestion = (req, res, next) => {
  const { title, description, category } = req.body;
  
  // ตรวจสอบว่ามีข้อมูลครบหรือไม่
  if (!title || !description || !category) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }
  
  // ตรวจสอบความยาวของข้อมูล
  if (title.length < 5 || title.length > 100) {
    return res.status(400).json({ message: 'หัวข้อคำถามต้องมีความยาว 5-100 ตัวอักษร' });
  }
  
  if (description.length < 10 || description.length > 1000) {
    return res.status(400).json({ message: 'รายละเอียดคำถามต้องมีความยาว 10-1000 ตัวอักษร' });
  }
  
  // ตรวจสอบหมวดหมู่
  const validCategories = ['ทั่วไป', 'การเขียนโปรแกรม', 'ฐานข้อมูล', 'เครือข่าย', 'อื่นๆ'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'หมวดหมู่ไม่ถูกต้อง' });
  }
  
  next();
};

// ตรวจสอบข้อมูลคำตอบ
export const validateAnswer = (req, res, next) => {
  const { content } = req.body;
  
  // ตรวจสอบว่ามีข้อมูลครบหรือไม่
  if (!content) {
    return res.status(400).json({ message: 'กรุณากรอกเนื้อหาคำตอบ' });
  }
  
  // ตรวจสอบความยาวของข้อมูล
  if (content.length > 300) {
    return res.status(400).json({ message: 'เนื้อหาคำตอบต้องไม่เกิน 300 ตัวอักษร' });
  }
  
  next();
}; 