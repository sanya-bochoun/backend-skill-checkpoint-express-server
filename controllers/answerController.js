import connectionPool from '../utils/db.mjs';

/**
 * @swagger
 * /api/questions/{questionId}/answers:
 *   get:
 *     summary: ดึงคำตอบทั้งหมดของคำถาม
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูล
 */
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

/**
 * @swagger
 * /api/questions/{questionId}/answers:
 *   post:
 *     summary: สร้างคำตอบใหม่
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: เนื้อหาคำตอบ (ไม่เกิน 300 ตัวอักษร)
 *     responses:
 *       201:
 *         description: สร้างคำตอบสำเร็จ
 *       400:
 *         description: เนื้อหาคำตอบเกิน 300 ตัวอักษร
 *       500:
 *         description: เกิดข้อผิดพลาดในการสร้างคำตอบ
 */
export const createAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { content } = req.body;

    // ตรวจสอบความยาวของคำตอบ
    if (content.length > 300) {
      return res.status(400).json({ message: 'เนื้อหาคำตอบต้องไม่เกิน 300 ตัวอักษร' });
    }
    
    const result = await connectionPool.query(
      'INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING *',
      [questionId, content]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำตอบ' });
  }
};

/**
 * @swagger
 * /api/questions/{questionId}/answers/{id}:
 *   put:
 *     summary: อัปเดตคำตอบ
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำตอบ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: เนื้อหาคำตอบ (ไม่เกิน 300 ตัวอักษร)
 *     responses:
 *       200:
 *         description: อัปเดตคำตอบสำเร็จ
 *       400:
 *         description: เนื้อหาคำตอบเกิน 300 ตัวอักษร
 *       404:
 *         description: ไม่พบคำตอบ
 *       500:
 *         description: เกิดข้อผิดพลาดในการอัปเดตคำตอบ
 */
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

/**
 * @swagger
 * /api/questions/{questionId}/answers/{id}:
 *   delete:
 *     summary: ลบคำตอบ
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำตอบ
 *     responses:
 *       200:
 *         description: ลบคำตอบสำเร็จ
 *       404:
 *         description: ไม่พบคำตอบ
 *       500:
 *         description: เกิดข้อผิดพลาดในการลบคำตอบ
 */
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

/**
 * @swagger
 * /api/questions/{questionId}/answers/{id}/vote:
 *   post:
 *     summary: โหวตคำตอบ
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำตอบ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vote
 *             properties:
 *               vote:
 *                 type: integer
 *                 enum: [1, -1]
 *                 description: 1 สำหรับเห็นด้วย, -1 สำหรับไม่เห็นด้วย
 *     responses:
 *       200:
 *         description: โหวตสำเร็จ
 *       400:
 *         description: ค่า vote ไม่ถูกต้อง
 *       500:
 *         description: เกิดข้อผิดพลาดในการโหวต
 */
export const voteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body; // 1 หรือ -1

    if (vote !== 1 && vote !== -1) {
      return res.status(400).json({ message: 'ค่า vote ต้องเป็น 1 หรือ -1 เท่านั้น' });
    }

    const result = await connectionPool.query(
      'INSERT INTO answer_votes (answer_id, vote) VALUES ($1, $2) RETURNING *',
      [id, vote]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการโหวต' });
  }
}; 