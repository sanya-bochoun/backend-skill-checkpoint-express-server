import connectionPool from '../utils/db.mjs';

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: ดึงคำถามทั้งหมด
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูล
 */
export const getAllQuestions = async (req, res) => {
  try {
    const result = await connectionPool.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
  }
};

/**
 * @swagger
 * /api/questions/search:
 *   get:
 *     summary: ค้นหาคำถาม
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: ค้นหาตามหัวข้อ
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: ค้นหาตามหมวดหมู่
 *     responses:
 *       200:
 *         description: ค้นหาข้อมูลสำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดในการค้นหาข้อมูล
 */
export const searchQuestions = async (req, res) => {
  try {
    const { title, category } = req.query;
    let query = 'SELECT * FROM questions WHERE 1=1';
    const values = [];

    if (title) {
      values.push(`%${title}%`);
      query += ` AND title ILIKE $${values.length}`;
    }

    if (category) {
      values.push(`%${category}%`);
      query += ` AND category ILIKE $${values.length}`;
    }

    const result = await connectionPool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหาข้อมูล' });
  }
};

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: ดึงคำถามตาม ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ
 *       404:
 *         description: ไม่พบคำถาม
 *       500:
 *         description: เกิดข้อผิดพลาดในการดึงข้อมูล
 */
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

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: สร้างคำถามใหม่
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: หัวข้อคำถาม
 *               description:
 *                 type: string
 *                 description: รายละเอียดคำถาม
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของคำถาม
 *     responses:
 *       201:
 *         description: สร้างคำถามสำเร็จ
 *       500:
 *         description: เกิดข้อผิดพลาดในการสร้างคำถาม
 */
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

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: อัปเดตคำถาม
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - title
 *               - description
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: หัวข้อคำถาม
 *               description:
 *                 type: string
 *                 description: รายละเอียดคำถาม
 *               category:
 *                 type: string
 *                 description: หมวดหมู่ของคำถาม
 *     responses:
 *       200:
 *         description: อัปเดตคำถามสำเร็จ
 *       404:
 *         description: ไม่พบคำถาม
 *       500:
 *         description: เกิดข้อผิดพลาดในการอัปเดตคำถาม
 */
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

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: ลบคำถาม
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID ของคำถาม
 *     responses:
 *       200:
 *         description: ลบคำถามสำเร็จ
 *       404:
 *         description: ไม่พบคำถาม
 *       500:
 *         description: เกิดข้อผิดพลาดในการลบคำถาม
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectionPool.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'ไม่พบคำถาม' });
    }
    
    res.json({ message: 'ลบคำถามและคำตอบที่เกี่ยวข้องเรียบร้อย' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการลบคำถาม' });
  }
};

/**
 * @swagger
 * /api/questions/{id}/vote:
 *   post:
 *     summary: โหวตคำถาม
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
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
export const voteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote } = req.body; // 1 หรือ -1

    if (vote !== 1 && vote !== -1) {
      return res.status(400).json({ message: 'ค่า vote ต้องเป็น 1 หรือ -1 เท่านั้น' });
    }

    const result = await connectionPool.query(
      'INSERT INTO question_votes (question_id, vote) VALUES ($1, $2) RETURNING *',
      [id, vote]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการโหวต' });
  }
}; 