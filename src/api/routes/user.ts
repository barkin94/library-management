import { Router } from "express";
import {
  getUserById,
  getUserBorrowedBooks,
} from "../controllers/user";

const router = Router();

router.get("/:id", getUserById);
router.get("/:id/borrowed-books", getUserBorrowedBooks);

export default router;
