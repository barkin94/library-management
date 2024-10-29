import { Request, Response } from "express";
import bookRepository from '../../data/repositories/book'

export const getBookByIdWithAverageScore = async (req: Request, res: Response) => {
   const result = await bookRepository.getBookByIdWithAverageScore(req.params.id);

  if(!result) {
    res.status(404).json({ message: "book not found" });
    return;
  }

  if(!result.score)
    result.score = -1

  res.json(result);
};

export const getBooks = async (req: Request, res: Response) => {
  res.json(bookRepository.findAll());
};

export const createBook = async (req: Request, res: Response) => {
  bookRepository.createBook(req.body.name)
  res.status(201).json();
};

