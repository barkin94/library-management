export type Borrow = {
  id: number,
  user: User;
  book: Book;
  borrowedAt: Date;
  returnedAt?: Date;
  rating?: number;
}

export type User = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  borrows: Borrow[];
}

export type Book = {
  id: number;
  title: string;
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
  borrows: Borrow[];
}
