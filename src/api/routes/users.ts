import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  borrowBook,
  returnBook,
} from "../controllers/users";
import expressJoiValidation from "express-joi-validation";
import { createUserBodySchema } from "../validators/users";

const validator = expressJoiValidation.createValidator();
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validator.body(createUserBodySchema), createUser)
router.post("/:userId/borrow/:bookId", borrowBook);
router.post("/:userId/return/:bookId", returnBook);

export default router;
