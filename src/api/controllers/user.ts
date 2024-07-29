import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Borrow } from "../../data/entities/borrow";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const getUserBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const bookBorrowRepository = getRepository(BookBorrow);
    const borrows = await bookBorrowRepository.find({
      where: { user: req.params.id },
      relations: ["book"],
      order: { borrowDate: "DESC" },
    });

    const currentlyBorrowed = borrows.filter((borrow) => !borrow.returnDate);
    const previouslyBorrowed = borrows.filter((borrow) => borrow.returnDate);

    res.json({ currentlyBorrowed, previouslyBorrowed });
  } catch (error) {
    res.status(500).json({ message: "Error fetching borrowed books", error });
  }
};
