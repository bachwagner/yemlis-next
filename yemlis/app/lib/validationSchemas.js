import Joi from "joi"
export const login = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Şifre alanı gerekli',
    })
})
export const email = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    })
})
export const register = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Şifre alanı gerekli',
    }),
    repeatpassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Şifreler Eşleşmeli' }),
    acceptmails: Joi.boolean(),
    acceptterms: Joi.boolean().invalid(false)
})


/* .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Şifreler Eşleşmeli'}), */