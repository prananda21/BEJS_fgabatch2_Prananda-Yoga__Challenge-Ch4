import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/,
    )
    .required(),
  pin: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required(),
});

export const userUpdateSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().pattern(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$])[A-Za-z\d@#$]+$/,
  ),
  pin: Joi.string().pattern(
    /^[0-9]+$/,
    'numbers',
  ),
});

export const idSchema = Joi.object({
  id: Joi.string().required(),
});
