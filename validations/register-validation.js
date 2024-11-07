// import package for validation
const joi = require("joi");

// set register validation schema
    // add trim for whitespaces
const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username: joi.string()
            .trim()
            .required()
            .min(3)
            .max(256),
        
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

// export register validation schema to app
module.exports.registerValidation = registerValidation;
