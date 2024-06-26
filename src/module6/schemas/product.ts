import Joi from 'joi';

export const productIdSchema = Joi.string()
  .guid({ version: 'uuidv4' })
  .required();

export const productSchema = Joi.object({
  'productId': Joi.string().guid({ version: 'uuidv4' }).required(),
  'count': Joi.string().required()
})
