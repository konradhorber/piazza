// import package for validation
const joi = require("joi");

// set register validation schema
    // add trim for whitespaces
    // add error messages including abortEarly: false to send all error messages not just the first
const registerValidation = (data) => {
    const schemaValidation = joi.object({
        username: joi.string()
            .trim()
            .required()
            .min(3)
            .max(256)
            .messages({
                "string.empty": "Username is required",
                "string.min": "Username should be at least 3 characters",
                "string.max": "Username should be less than or equal to 256 characters"
            }),
        
        email: joi.string()
            .trim()
            .required()
            .min(3)
            .max(256)
            .email()
            .messages({
                "string.empty": "Email is required",
                "string.email": "Email format is invalid",
                "string.min": "Email should be at least 3 characters",
                "string.max": "Email should be less than or equal to 256 characters"
            }),
        
        password: joi.string()
            .required()
            .min(6)
            .max(1024)
            .messages({
                "string.empty": "Password is required",
                "string.min": "Password should be at least 6 characters",
                "string.max": "Password should be less than or equal to 1024 characters",
            })
    });
    return schemaValidation.validate(data, { abortEarly: false });
};

// export register validation schema to app
module.exports.registerValidation = registerValidation;
