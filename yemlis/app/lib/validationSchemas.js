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
    name: Joi.string().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/
    )
        .messages({
            'string.base': 'Geçersiz Besin Grubu İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
            'string.empty': 'Besin Grubu alanı gerekli',
        }),
    parent: Joi.alternatives().conditional(
        'noParent',
        {
            is: true,
            then: Joi.any().allow(null),
            otherwise: Joi.string().required().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
                .messages({
                    'string.base': 'Geçersiz Besin Grubu Parenti İsmi',
                    'string.pattern.base': 'Besin Grubu Parenti  özel karakter içeremez',
                    'string.min': 'Besin Grubu Parenti en az 2 karakter içermeli',
                    'string.max': 'Besin Grubu Parenti en fazla 255 karakter içermeli',
                    'string.empty': 'Besin Grubu Parenti alanı gerekli',
                })
        }),
    text: Joi.string().min(2).max(255).pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
        'string.base': 'Geçersiz Besin Grubu İsmi',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
        'string.min': 'Besin Grubu en az 2 karakter içermeli',
        'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
        'string.empty': 'Besin Grubu alanı gerekli',
    }),
    tags: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).required().messages({
        'array.base': 'Geçersiz Besin Etiketi Formatı',
        'array.pattern.base': 'Özel karakter içeremez',
        'array.min': 'Besin Grubu Etiketi en az 2 etiket içermeli',
        'array.max': 'Besin Grubu Etiketi en fazla 5 etiket içermeli',
        'string.max': 'Besin Grubu Etiketi en fazla 20 karakter içermeli',
        'array.empty': 'Besin Grubu Etiketi alanı gerekli',
    }),
    noParent: Joi.boolean()
})

export const deleteFoodGroup = Joi.object({
    name: Joi.string().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/
    )
        .messages({
            'string.base': 'Geçersiz Besin Grubu İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
            'string.empty': 'Besin Grubu alanı gerekli',
        })
  
})
/* .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Şifreler Eşleşmeli'}), */