import Joi from 'joi';

export const createUserBodySchema = Joi.object({
  name: Joi.string().required(),
});

export const returnBookBodySchema = Joi.object({
  score: Joi.number().required(),
});
