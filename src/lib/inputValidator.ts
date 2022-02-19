import { UserInputError } from 'apollo-server-express';
import { ObjectSchema } from 'joi';

const inputValidator = (schema: ObjectSchema, object: object) => {
  //  this function take the joi object and the args.data in her parameters
  const options = { abortEarly: false };

  const { error } = schema.validate(object, options);

  if (error) {
    throw new UserInputError(error.message, {
      ValidationError: error.details,
    });
  }
};

export default inputValidator;
