const Joi = require('joi');

const generalRulesNames = Joi.string()//de type string
  .min(2)
  .required()//donnée obligatoire
  .max(64)
  .pattern(/^[a-zA-ZÀ-ÿ '-]+$/);//




const userSchema = Joi.object({



  email : Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } })
    .required(),





  password:Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})
;

module.exports = userSchema;

