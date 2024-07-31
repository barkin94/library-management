import Joi from 'joi';


export const returnBookBodySchema = Joi.object({
  score: Joi.number().min(1).required(),
});


export const userIdAndBookIdSchema = Joi.object({
  userId: Joi.number().min(1).required(),
  bookId: Joi.number().min(1).required(),
});
