import Joi from 'joi';

//  create all objects Joi to validate all input data

export const user = Joi.object().keys({
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

export const organization = Joi.object().keys({
  name: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(6).max(20),
  email: Joi.string().email({ allowUnicode: false }).required(),
  address: Joi.string().min(5).required(),
  zipCode: Joi.number().integer().min(1).max(99999).required(),
  city: Joi.string().max(150).required(),
  idUser: Joi.number().integer().id().required(),
  siret: Joi.string().min(14).max(14).required(),
});

export const draw = Joi.object().keys({
  name: Joi.string().min(2).max(255).required(),
  idUser: Joi.number().integer().id().required(),
  idOrganization: Joi.number().integer().id(),
  idTheme: Joi.number().integer().id().required(),
  urlDraw: Joi.string().required(),
});

export const orderItem = Joi.object().keys({
  quantity: Joi.number().integer().required(),
  idShirt: Joi.number().integer().id().required(),
});

export const order = Joi.object().keys({
  price: Joi.number().required(),
  date: Joi.date(),
  address: Joi.string().min(5).required(),
  zipCode: Joi.number().integer().min(1).max(99999).required(),
  city: Joi.string().max(150).required(),
  idUser: Joi.number().integer().id().required(),
});

export const size = Joi.object().keys({
  name: Joi.string().min(1).max(5).required(),
});

export const theme = Joi.object().keys({
  name: Joi.string().min(3).required(),
  color: Joi.string().min(6).required(),
  iconUrl: Joi.string().required(),
});

export const shirt = Joi.object().keys({
  idDraw: Joi.number().integer().id().required(),
  idSize: Joi.number().integer().id().required(),
  price: Joi.number().integer().required(),
});
