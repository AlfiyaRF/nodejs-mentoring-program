import Joi from 'joi';

export const headerSchema = Joi.object({
  'x-user-id': Joi.string().guid({ version: 'uuidv4' }).required(),
  'user-agent': 'PostmanRuntime/7.29.2',
  'accept': '*/*',
  'postman-token': Joi.string().guid({ version: 'uuidv4' }),
  'host': 'localhost:8000',
  'accept-encoding': 'gzip, deflate, br',
  'connection': 'keep-alive',
  'content-type': 'application/json',
  'content-length': Joi.string().min(1).max(100),
});
