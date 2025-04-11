import express from "express";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

// Test route
app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
