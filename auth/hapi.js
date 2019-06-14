const Joi = require("@hapi/joi");
const ifsc_pattern = {
  ifsc: Joi.string().regex(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/)
};

const bname_city_pattern = {
  bname: Joi.string()
    .max(100)
    .required(),
  city: Joi.string()
    .max(100)
    .required()
};

const ifsc_validate = ifsc => {
  return Joi.validate(ifsc, ifsc_pattern).error;
};

const bname_city_validate = details => {
  return Joi.validate(details, bname_city_pattern).error;
};

const validate = {
  ifsc_validate: ifsc_validate,
  bname_city_validate: bname_city_validate
};

module.exports = validate;
