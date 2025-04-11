import connectionPool from '../utils/db.mjs';

// ดึงคำถามทั้งหมด
export const getAllQuestions = async (req, res) => {
  try {
    const result = await connectionPool.query('SELECT * FROM questions');
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in getAllQuestions:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล', error: error.message });
  }
};

// ดึงคำถามตาม ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectionPool.query('SELECT * FROM questions WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำถาม' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

// สร้างคำถามใหม่
export const createQuestion = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const result = await connectionPool.query(
      'INSERT INTO questions (title, description, category) VALUES ($1, $2, $3) RETURNING *',
      [title, description, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำถาม' });
  }
};

// อัปเดตคำถาม
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    
    const result = await connectionPool.query(
      'UPDATE questions SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *',
      [title, description, category, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำถาม' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตคำถาม' });
  }
};

// ลบคำถาม
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectionPool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำถาม' });
    }
    
    res.json({ message: 'ลบคำถามสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบคำถาม' });
  }
}; 