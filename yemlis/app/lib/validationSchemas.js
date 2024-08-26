import Joi, { string } from "joi"
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
    name: Joi.string().pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
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
export const deleteAccount = Joi.object({
    demandType: Joi.string().max(50).valid("deleteAccount").messages({
        "string.valid": "Invalid Delete Account Request"
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
}).with("password", "repeatpassword")

export const foodGroup = Joi.object({
    name: Joi.string().min(2).max(120).pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
        'string.base': 'Geçersiz Besin Gurubu İsmi',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
        'string.min': 'Besin Gurubu en az 2 karakter içermeli',
        'string.max': 'Besin Gurubu en fazla 255 karakter içermeli',
        'string.empty': 'Besin Gurubu alanı gerekli',
    }),
    parent: Joi.string().length(24).pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
        'string.base': 'Geçersiz Besin Gurubu İsmi',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
        'string.length': 'Geçersiz Parent Id',
        'string.empty': 'Besin Gurubu alanı gerekli',
    }),
    text: Joi.string().min(2).max(255).pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
        'string.base': 'Geçersiz Besin Gurubu İsmi',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
        'string.min': 'Besin Gurubu en az 2 karakter içermeli',
        'string.max': 'Besin Gurubu en fazla 255 karakter içermeli',
        'string.empty': 'Besin Gurubu alanı gerekli',
    }),
    tags: Joi.array().items(Joi.string().min(2).max(20)).max(5).required()
})
/* .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Şifreler Eşleşmeli'}), */