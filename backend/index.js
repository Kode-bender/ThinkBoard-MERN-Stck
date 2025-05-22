import express from "express";
import "dotenv/config";
import cors from 'cors'

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./lib/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const port = process.env.port || 5001;

app.use(cors())
app.use(express.json());
app.use(rateLimiter);

app.use("/api/v1/notes", notesRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
  });
});
