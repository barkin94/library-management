import { Request, Response } from "express";
import { BookBorrow } from "../../data/entities/book-borrow";
import { IsNull, Repository } from "typeorm";
import { User } from "../../data/entities/user";
import { Book } from "../../data/entities/book";
import { BookReturn } from "../../data/entities/book-return";

let bookRepository: Repository<Book>;
let userRepository: Repository<User>;
let bookBorrowRepository: Repository<BookBorrow>;
let bookReturnRepository: Repository<BookReturn>;

export const constructUsersController = (
  bookRepo: Repository<Book>,
  userRepo: Repository<User>,
  bookBorrowRepo: Repository<BookBorrow>,
  bookReturnRepo: Repository<BookReturn>
) => {
  bookRepository = bookRepo;
  userRepository = userRepo;
  bookReturnRepository = bookReturnRepo;
  bookBorrowRepository = bookBorrowRepo;
}

export const getUserById = async (req: Request, res: Response) => {
  const user = await userRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: {
      borrows: {
        book: true,
        bookReturn: true
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
    const bookReturn = borrow.bookReturn;
    const bookData = {
      name: borrow.book!.name,
      userScore: bookReturn?.rating ?? undefined
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
  const users = await userRepository.find();

  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User();
  user.name = req.body.name;

  await userRepository.save(user);

  res.status(201).json();
};

// TODO: needs rework
export const borrowBook = async (req: Request, res: Response) => {
  const [user, book] = await Promise.all([
    userRepository.findOneBy({ id: parseInt(req.params.userId)}),
    bookRepository.findOne({
      where: {
        id: parseInt(req.params.bookId),
        borrows: {
          bookReturn: IsNull()
        }
      },
      relations: {
        borrows: {
          bookReturn: true
        }
      },
    }),
  ]);

  if(!user) {
    res.status(404).json({ message: "user not found" });
    return;
  }

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
  borrow.user = user;
  await bookBorrowRepository.save(borrow);
  
  res.status(204).json();
}

export const returnBook = async (req: Request, res: Response) => {
  // bookRepository.findOne({
  //   where: {
  //     id: parseInt(req.params.bookId),
  //     borrows: {
  //       user: { id: parseInt(req.params.userId) },
  //       bookReturn: IsNull()
  //     }
  //   },
  //   relations: {
  //     borrows: true
  //   },
  // }),

  const borrow = await bookBorrowRepository.findOne({
    where: {
      user: { id: parseInt(req.params.userId) },
      book: { id: parseInt(req.params.bookId) },
      bookReturn: IsNull()
    },
   relations: {
     book: true,
     user: true,
     bookReturn: true
  }
  })

  if(!borrow) {
    res.status(403).json({ message: "not eligible for return" });
    return;
  }

  const bookReturn = new BookReturn();
  bookReturn.rating = req.body.score;
  bookReturn.returnedAt = new Date();
  bookReturn.bookBorrow = borrow;
  await bookReturnRepository.save(borrow)

  res.status(204).json();
}
  
