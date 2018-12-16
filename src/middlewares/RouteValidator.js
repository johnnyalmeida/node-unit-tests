const Joi = require('joi');

class RouteValidator {

  static validate(schema) {
    return this._validate.bind(schema);
  }

  static _validate(req, res, next) {
    const data = {};
    const schema = this;

    Object.keys(schema).map((k) => {
      data[k] = req[k];
      return k;
    });

    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    const validation = Joi.validate(data, schema, options);
    if (!validation.error) {
      req.joi = {
        body: validation.value.body || {},
        query: validation.value.query || {},
        params: validation.value.params || {},
        headers: validation.value.headers || {},
      };
      next();
    } else {
      res.status(400).send({
        success: false,
        messages: validation.error.details,
      });
    }
  }
}

module.exports = RouteValidator;
