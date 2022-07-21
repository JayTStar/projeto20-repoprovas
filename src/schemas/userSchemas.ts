import Joi from "joi";

const signUpSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: Joi.ref('password')
});

const signInSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

const userSchemas = {
    signUpSchema,
    signInSchema
};

export default userSchemas;