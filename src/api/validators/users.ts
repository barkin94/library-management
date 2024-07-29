import Joi from 'joi';


const querySchema = Joi.object({
  name: Joi.string().required(),
});
