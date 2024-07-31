import { Router } from "express";
import {
  getUserById,
  getUsers,
  createUser,
  borrowBook,
  returnBook,
} from "../controllers/users";
import expressJoiValidation from "express-joi-validation";
import { returnBookBodySchema, userIdAndBookIdSchema } from "../validators/users";
import { nameSchema, idSchema } from "../validators/common";

const validator = expressJoiValidation.createValidator();
const router = Router();

router.get("/", getUsers);
router.get("/:id", validator.params(idSchema), getUserById);
router.post("/", validator.body(nameSchema), createUser)
router.post("/:userId/borrow/:bookId", validator.params(userIdAndBookIdSchema), borrowBook);
router.post(
  "/:userId/return/:bookId",
  validator.params(userIdAndBookIdSchema),
  validator.body(returnBookBodySchema),
  returnBook
);

export default router;
