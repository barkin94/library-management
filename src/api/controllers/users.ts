import { Request, Response } from "express";

import userRepository from "../../data/repositories/user";
import bookBorrowRepository from '../../data/repositories/book-borrow';
import bookReturnRepository from '../../data/repositories/book-return';
import bookRepository from '../../data/repositories/book';

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.getUserById(parseInt(req.params.id));

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
  await userRepository.createUser({ name: req.body.name });

  res.status(201).json();
};

export const borrowBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId);
  const userId = 1;
  const book = await bookRepository.findOneByIdWhereBookReturnIsNull(bookId); 

  if(!book) {
    res.status(404).json({ message: "book not found" })
    return;
  }

  if(book.borrows.length) {
    res.status(403).json({ message: "book is unavailable" })
    return;
  }
  
  await bookBorrowRepository.create({ bookId, userId });
  
  res.status(204).json();
}

export const returnBook = async (req: Request, res: Response) => {
  const userId = parseInt(req.body.userId);
  const bookId = parseInt(req.body.bookId);
  const score = parseInt(req.body.score);


  const result = await bookBorrowRepository.findOneByUserIdAndBookIdWhereBookReturnIsNull(userId, bookId)

  if(!result) {
    res.status(403).json({ message: "not eligible for return" });
    return;
  }

  await bookReturnRepository.create({
    bookBorrowId: result["book_borrows"].id,
    rating: score
  })

  res.status(204).json();
}
  
