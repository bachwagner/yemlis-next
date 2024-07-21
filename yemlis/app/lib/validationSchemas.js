import Joi from "joi"
export const login = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Şifre alanı gerekli',
    }),
    
})
export const settings = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+$/).messages({
        'string.base': 'Geçersiz isim',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    }),
    password: Joi.string().min(6).messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Şifre alanı gerekli',
    }),
    newpassword: Joi.string().min(6).messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Yeni Şifre alanı gerekli',
    })
 
})
export const justEmail = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).messages({
        'string.email': 'Geçersiz  email adresi',
    })
})
export const newPassword = Joi.object({
    password: Joi.string().min(6).required().messages({
        'string.min': 'Şifre en az 6 karakter içermeli',
        'string.empty': 'Şifre alanı gerekli',
    }),
    repeatpassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Şifreler Eşleşmeli'
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
}).with("password","repeatpassword")


/* .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Şifreler Eşleşmeli'}), */