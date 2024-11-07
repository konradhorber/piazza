// import package for validation
const joi = require("joi");

// set login validation schema incl trim for whitespaces
const loginValidation = (data) => {
    const schemaValidation = joi.object({     
        email: joi.string()
            .trim()
            .required()
            .min(3)
            .max(256)
            .email(),
        
        password: joi.string()
            .required()
            .min(6)
            .max(1024)
    });
    return schemaValidation.validate(data);
};


// export login validation schema to app
module.exports.loginValidation = loginValidation;