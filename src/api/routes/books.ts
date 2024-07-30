import { Router } from "express";

import expressJoiValidation from "express-joi-validation";
import { createBookBodySchema } from "../validators/books";
import { createBook, getBookByIdWithAverageScore, getBooks } from "../controllers/books";

const validator = expressJoiValidation.createValidator();

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBookByIdWithAverageScore);
router.post("/",  validator.body(createBookBodySchema), createBook)

export default router;
