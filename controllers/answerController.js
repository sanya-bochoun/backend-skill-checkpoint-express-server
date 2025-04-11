import connectionPool from '../utils/db.mjs';

// ดึงคำตอบทั้งหมดของคำถาม
export const getAnswersByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const result = await connectionPool.query(
      'SELECT * FROM answers WHERE question_id = $1 ORDER BY created_at DESC',
      [questionId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

// สร้างคำตอบใหม่
export const createAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;
    
    const result = await connectionPool.query(
      'INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *',
      [questionId, content]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำตอบ' });
  }
};

// อัปเดตคำตอบ
export const updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    const result = await connectionPool.query(
      'UPDATE answers SET content = $1 WHERE id = $2 RETURNING *',
      [content, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำตอบ' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตคำตอบ' });
  }
};

// ลบคำตอบ
export const deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectionPool.query('DELETE FROM answers WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำตอบ' });
    }
    
    res.json({ message: 'ลบคำตอบสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบคำตอบ' });
  }
}; 