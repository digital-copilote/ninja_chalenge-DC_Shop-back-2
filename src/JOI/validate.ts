import Joi from 'joi';

//  create all objects Joi to validate all input data

export const postUser = Joi.object().keys({
  firstname: Joi.string().min(3).max(100),
  lastname: Joi.string().min(3).max(100),
  birthday: Joi.date(),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  address: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  zipCode: Joi.number().integer().min(1).max(99999),
  city: Joi.string().max(150),
  role: Joi.string(),
  bio: Joi.string().max(255),
});

export const updateUser = Joi.object().keys({
  firstname: Joi.string().min(3).max(100),
  lastname: Joi.string().min(3).max(100),
  birthday: Joi.date(),
  email: Joi.string().email({ allowUnicode: false }).required(),
  password: Joi.string().min(7).max(255).required(),
  address: Joi.string().min(5),
  phone: Joi.string().min(6).max(20),
  zipCode: Joi.number().integer().min(1).max(99999),
  city: Joi.string().max(150),
  role: Joi.string(),
  bio: Joi.string().max(255),
});
