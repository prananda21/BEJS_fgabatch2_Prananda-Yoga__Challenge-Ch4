import Joi from 'joi';

export const idTxValidation = Joi.object({
  tx_id: Joi.string().required(),
});

export const withdrawValidation = Joi.object({
  number: Joi.string().required(),
  amount: Joi.number().required(),
  type: Joi.string().required(),
  description: Joi.string(),
  destination: Joi.string().required(),
});
