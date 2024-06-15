import Joi from "joi"
export const login = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string().min(6).required()
})