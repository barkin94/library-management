import { Router } from "express";

import { createBook, getBookByIdWithAverageScore, getBooks } from "../controllers/books";
import { nameSchema, validator } from "../validators/common";
import { idSchema } from "../validators/common";

const router = Router();

router.get("/", getBooks);
router.get("/:id", validator.params(idSchema), getBookByIdWithAverageScore);
router.post("/",  validator.body(nameSchema), createBook)

export default router;
