// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres:admin@localhost:5432/skill-checkpoint-express-server-DB",
});

export default connectionPool;
