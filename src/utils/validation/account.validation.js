import Joi from 'joi';

export const accountSchema = Joi.object({
  user_id: Joi.string().required(),
  interest_rate: Joi.number().required(),
  type: Joi.string().required(),
});

export const findAccountSchema = Joi.object({
  user_id: Joi.string().required(),
  account_id: Joi.string().required(),
});

export const findAllAccountSchema = Joi.object({
  user_id: Joi.string().required(),
});
