import Joi from 'joi';

export const credentialSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  birthPlace: Joi.string().required(),
  birthDate: Joi.date().iso().required(),
  nationalId: Joi.string().required(),
  isEmployeed: Joi.boolean().default(false),
  job: Joi.string(),
  motherName: Joi.string().required(),
  userId: Joi.string().required(),
});
