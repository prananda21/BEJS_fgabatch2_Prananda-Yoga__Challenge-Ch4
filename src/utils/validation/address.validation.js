import Joi from 'joi';

export const addressSchema = Joi.object({
  street: Joi.string(),
  district: Joi.string().required(),
  regency: Joi.string().required(),
  province: Joi.string().required(),
  country: Joi.string().required(),
  postal_code: Joi.string().pattern(
    /^[0-9]+$/,
    'numbers',
  ),
  address_type: Joi.string().required(),
  user_id: Joi.string().required(),
});

export const idAddressSchema = Joi.object({
  user_id: Joi.string().required(),
  address_id: Joi.string().required(),
});
