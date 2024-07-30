import { Request, Response } from "express";
import { userRepository } from "../../data/repositories/user";
import { borrowRepository } from "../../data/repositories/borrow";
import { BookBorrow } from "../../data/entities/book-borrow";
import { bookRepository } from "../../data/repositories/book";
import { IsNull } from "typeorm";
import { User } from "../../data/entities/user";

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: {
      borrows: {
        book: true
      }
    }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const past = [];
  const present = [];

  while(user.borrows!.length) {
    const borrow = user.borrows!.pop()!;
    const bookData = {
      name: borrow.book!.name,
      userScore: borrow.rating ?? undefined
    }

    borrow.returnedAt
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
  const users = await userRepository.find();

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User();
  user.name = req.body.name;

  await userRepository.save(user);

  res.status(201).json();
};


export const borrowBook = async (req: Request, res: Response) => {
  const [user, book] = await Promise.all([
    userRepository.findOneBy({ id: parseInt(req.params.userId)}),
    bookRepository.findOneBy({ id: parseInt(req.params.bookId)}),
  ]);

  if(!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

  if(!book) {
    res.status(404).json({ message: "book not found" })
    return;
  }

  const isBookUnvailable =
    await borrowRepository.findOne({
      where: {
        book: { id: parseInt(req.params.bookId) },
        returnedAt: IsNull()
      },
      relations: {
        book: true,
      }
    })

  if(isBookUnvailable) {
    res.status(403).json({ message: "book is unavailable" })
  }

  const borrow = new BookBorrow();
  borrow.book = book;
  borrow.user = user;
  await borrowRepository.save(borrow);
  
  res.status(204).json();
}

export const returnBook = async (req: Request, res: Response) => {
  const borrow = await borrowRepository.findOne({
    where: {
      user: { id: parseInt(req.params.userId) },
      book: { id: parseInt(req.params.bookId) },
      returnedAt: IsNull()
    },
    relations: {
      book: true,
      user: true
    }
  })

  if(!borrow) {
    res.status(403).json({ message: "already returned" });
    return;
  }

  borrow.rating = req.body.score;
  borrow.returnedAt = new Date();

  await borrowRepository.save(borrow)

  res.status(204).json();
}
  
