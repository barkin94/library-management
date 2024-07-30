import Joi from 'joi';

export const createBookBodySchema = Joi.object({
  name: Joi.string().required(),
});
