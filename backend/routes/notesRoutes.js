import express from "express";
import {
  createNote,
  deleteNote,
  getAllNoteById,
  getAllNotes,
  updateNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getAllNoteById)
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
