import { validate } from 'jsonschema';

/**
 * Accepts the schema as a parameter and returns the validation schema.
 * This makes the middleware more generic.
 *
 * @example
 * const { schemaValidator } = require('../middlewares/schema-validation.middleware.js');
 * router.post('/message', schemaValidator(require('./message-handler-input.schema.json')), handler);
 *
 * @param {object} schema
 * @returns {Function} middleware function
 */
export const schemaValidator = (schema) => {
  /**
   * Validates that the incoming object aligns with given schema
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {*} next
   */
  return (req, res, next) => {
    const check = validate(req.body, schema);
    if (!check.valid) {
      // takes errors array's first element's message attribute
      const [{ message }] = check.errors;
      res.status(400).send({ message });
      return;
    }
    next();
  };
};
