import { Request, Response } from "express";

import userRepository from "../../data/repositories/user";
import bookBorrowRepository from '../../data/repositories/book-borrow';
import bookReturnRepository from '../../data/repositories/book-return';
import bookRepository from '../../data/repositories/book';
import { BookBorrow } from "../../data/mikroorm/entities/book-borrow";
import { BookReturn } from "../../data/mikroorm/entities/book-return";
import { User } from "../../data/mikroorm/entities/user";

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const past = [];
  const present = [];

  while(user.borrows!.length) {
    const borrow = user.borrows.pop()!;
    const bookReturn = borrow.bookReturn;
    const bookData = {
      name: borrow.book!.name,
      userScore: bookReturn?.rating
    }
    bookReturn
      ? past.push(bookData)
      : present.push(bookData);
  }

  res.json({
    id: user.id,
    name: user.name,
    books: {
      past,
      present
    }
  });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.findAll();

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User();
  user.name = req.body.name;

  await userRepository.createUser(user);

  res.status(201).json();
};

// TODO: needs rework
export const borrowBook = async (req: Request, res: Response) => {
  const book = await bookRepository.findOneByIdWhereBookReturnIsNull(req.params.bookId); 

  if(!book) {
    res.status(404).json({ message: "book not found" })
    return;
  }

  if(book.borrows.length) {
    res.status(403).json({ message: "book is unavailable" })
    return;
  }
  
  const borrow = new BookBorrow();
  borrow.book = book;

  await bookBorrowRepository.save(borrow);
  
  res.status(204).json();
}

export const returnBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  const borrow = await bookBorrowRepository.findOneByUserIdAndBookIdWhereBookReturnIsNull(userId, bookId)

  if(!borrow) {
    res.status(403).json({ message: "not eligible for return" });
    return;
  }

  const bookReturn = new BookReturn();
  bookReturn.rating = req.body.score;
  bookReturn.returnedAt = new Date();
  bookReturn.bookBorrow = borrow;
  await bookReturnRepository.save(bookReturn)

  res.status(204).json();
}
  
