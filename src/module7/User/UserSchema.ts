import Joi from 'joi';

export const userNameSchema = Joi.object({
  'name': Joi.string().required()
})

export const userIdSchema = Joi.object({
  'id': Joi.string().guid({ version: 'uuidv4' }).required()
})
