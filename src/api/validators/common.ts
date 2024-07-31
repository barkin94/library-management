import Joi from "joi";
import expressJoiValidation from "express-joi-validation";

export const validator = expressJoiValidation.createValidator();

export const nameSchema = Joi.object({
    name: Joi.string().min(2).required(),
});

export const idSchema = Joi.object({
    id: Joi.number().min(1).required(),
});
  