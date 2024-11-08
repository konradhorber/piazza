// import package for validation
const joi = require("joi");

// set register validation 
const registerValidation = (data) => {
    // define joi schema
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
            .trim()    
            .required()
            .min(6)
            .max(1024)
    });
    // validate data against schema rules
    return schemaValidation.validate(data);
};

// export register validation to app
module.exports.registerValidation = registerValidation;