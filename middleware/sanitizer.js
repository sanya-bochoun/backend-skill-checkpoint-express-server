// ทำความสะอาดข้อมูล
export const sanitizeInput = (req, res, next) => {
  try {
    if (req.body) {
      // ทำความสะอาดข้อมูลทุก field
      Object.keys(req.body).forEach(key => {
        if (typeof req.body[key] === 'string') {
          // ลบอักขระพิเศษที่อาจใช้ในการ SQL Injection
          req.body[key] = req.body[key]
            .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, char => {
              switch (char) {
                case "\0":
                  return "\\0";
                case "\x08":
                  return "\\b";
                case "\x09":
                  return "\\t";
                case "\x1a":
                  return "\\z";
                case "\n":
                  return "\\n";
                case "\r":
                  return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                  return "\\" + char;
                default:
                  return char;
              }
            });
        }
      });
    }
    next();
  } catch (error) {
    console.error("Error in sanitizeInput:", error);
    next(error);
  }
}; 