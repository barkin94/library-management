import Joi from 'joi';

export const createUserBodySchema = Joi.object({
  name: Joi.string().required(),
});
