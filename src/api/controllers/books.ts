import { Request, Response } from "express";
import { bookRepository } from "../../data/repositories/book";
import { Book } from "../../data/entities/book";

export const getBookByIdWithAverageScore = async (req: Request, res: Response) => {
  const result = await bookRepository
    .createQueryBuilder('book')
    .leftJoin('book.borrows', 'borrow')
    .where('book.id = :bookId', { bookId: req.params.id })
    .groupBy('book.id')
    .select('book.id', 'id')
    .addSelect('book.name', 'name')
    .addSelect('AVG(borrow.rating)', 'score')
    .getRawOne<{ id: string, name: string, score: number }>();

  if(!result) {
    res.status(404).json({ message: "book not found" });
    return;
  }

  if(!result.score)
    result.score = -1

  res.json(result);
};

export const getBooks = async (req: Request, res: Response) => {
  res.json(await bookRepository.find());
};

export const createBook = async (req: Request, res: Response) => {
  const book = new Book();
  book.name = req.body.name;
  await bookRepository.save(book);

  res.status(201).json();
};
