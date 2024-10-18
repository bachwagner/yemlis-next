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

//FOODGROUPS//

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

export const updateFoodGroup = Joi.object({
    oldName: Joi.string().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/
    )
        .messages({
            'string.base': 'Geçersiz Değiştirilecek Besin Grubu İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
            'string.empty': 'Eski Besin Grubu alanı gerekli',
        }),
    name: Joi.string().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/
    )
        .messages({
            'string.base': 'Geçersiz Besin Grubu İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
            'string.empty': 'Besinn Grubu alanı gerekli',
        }),
    parent: Joi.string().min(2).max(120).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Grubu Parenti İsmi',
            'string.pattern.base': 'Besin Grubu Parenti  özel karakter içeremez',
            'string.min': 'Besin Grubu Parenti en az 2 karakter içermeli',
            'string.max': 'Besin Grubu Parenti en fazla 255 karakter içermeli',
            'string.empty': 'Besin Grubu Parenti alanı gerekli',
        }).allow(null),
    text: Joi.string().min(2).max(255).pattern(/^[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/).messages({
        'string.base': 'Geçersiz Besin Grubu İsmi',
        'string.pattern.base': 'Harf ve özel karakter içeremez',
        'string.min': 'Besin Grubu en az 2 karakter içermeli',
        'string.max': 'Besin Grubu en fazla 255 karakter içermeli',
        'string.empty': 'Besin Grubu alanı gerekli',
    }),
    tags: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).messages({
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

//ITEMS//
export const item = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 50 karakter içermeli',
            'string.empty': 'Besin Öğesi alanı gerekli',
        }),
    usdaName: Joi.string().min(2).max(50).pattern(/^([a-zA-Z,]+\s)*[a-zA-Z]+$/
    ).allow(null)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi Usda İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Usda İsmi en az 2 karakter içermeli',
            'string.max': 'Usda İsmi en fazla 50 karakter içermeli',
        }),
    formula: Joi.string().min(1).max(50).pattern(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/
    )
        .messages({
            'string.base': 'Geçersiz Besin Öğesi Formülü',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu Formülü en az 2 karakter içermeli',
            'string.max': 'Besin Grubu Formülü en fazla 50 karakter içermeli',
        }),
    itemType: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi Türü İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Öğesi Türü en az 2 karakter içermeli',
            'string.max': 'Besin Öğesi Türü en fazla 50 karakter içermeli',
            'string.empty': 'Besin Öğesi Türü alanı gerekli',
        }),
    mainUnit: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi Ana Birimi İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Öğesi Ana Birimi  en az 2 karakter içermeli',
            'string.max': 'Besin Öğesi Ana Birimi  en fazla 50 karakter içermeli',
            'string.empty': 'Besin Öğesi Ana Birimi  alanı gerekli',
        }),
    measureUnits: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).required().messages({
        'array.base': 'Geçersiz Ölçüm Türü Formatı',
        'array.pattern.base': 'Özel karakter içeremez',
        'array.min': 'Ölçüm Türü Etiketi en az 2 etiket içermeli',
        'array.max': 'Ölçüm Türü Etiketi en fazla 5 etiket içermeli',
        'string.max': 'Ölçüm Türü Etiketi en fazla 20 karakter içermeli',
        'array.empty': 'Ölçüm Türü Etiketi alanı gerekli',
    }),
    isNutrient: Joi.boolean(),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi açıklaması',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Öğesi açıklaması en az 2 karakter içermeli',
            'string.max': 'Besin Öğesi açıklaması  en fazla 50 karakter içermeli',
        }),
})

export const updateItem = Joi.object({
    name: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Item İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Item en az 2 karakter içermeli',
            'string.max': 'Item en fazla 50 karakter içermeli',
            'string.empty': 'Item alanı gerekli',
        }),
    oldName: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Eski Item Grubu İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Eski Item en az 2 karakter içermeli',
            'string.max': 'Eski Item en fazla 50 karakter içermeli',
            'string.empty': 'Eski Item alanı gerekli',
        }),
    usdaName: Joi.string().min(2).max(50).pattern(/^([a-zA-Z,]+\s)*[a-zA-Z]+$/
    ).allow(null)
        .messages({
            'string.base': 'Geçersiz Item Usda İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'USDA ismi en az 2 karakter içermeli',
            'string.max': 'USDA ismi en fazla 50 karakter içermeli',
        }),
    formula: Joi.string().min(1).max(50).pattern(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/
    )
        .messages({
            'string.base': 'Geçersiz Item Formülü',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Item Formülü en az 2 karakter içermeli',
            'string.max': 'Item Formülü en fazla 50 karakter içermeli',
        }),
    itemType: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz ItemType İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'ItemType en az 2 karakter içermeli',
            'string.max': 'ItemType en fazla 50 karakter içermeli',
            'string.empty': 'ItemType alanı gerekli',
        }),
    mainUnit: Joi.string().min(1).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Besin Öğesi Ana Birimi İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Öğesi Ana Birimi  en az 2 karakter içermeli',
            'string.max': 'Besin Öğesi Ana Birimi  en fazla 50 karakter içermeli',
            'string.empty': 'Besin Öğesi Ana Birimi  alanı gerekli',
        }),
    measureUnits: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).messages({
        'array.base': 'Geçersiz Ölçüm Türü Formatı',
        'array.pattern.base': 'Özel karakter içeremez',
        'array.min': 'Ölçüm Türü Etiketi en az 2 etiket içermeli',
        'array.max': 'Ölçüm Türü Etiketi en fazla 5 etiket içermeli',
        'string.max': 'Ölçüm Türü Etiketi en fazla 20 karakter içermeli',
        'array.empty': 'Ölçüm Türü Etiketi alanı gerekli',
    }),
    isNutriean: Joi.boolean(),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Item açıklaması',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Item açıklaması en az 2 karakter içermeli',
            'string.max': 'Item açıklaması  en fazla 50 karakter içermeli',
        }),
})

export const deleteItem = Joi.object({
    name: Joi.string().min(2).max(120).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Item Grubu ismi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 120 karakter içermeli',
            'string.empty': 'Item alanı gerekli',
        })

})

//UNITS//

export const unit = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz Unit İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 50 karakter içermeli',
            'string.empty': 'Unit alanı gerekli',
        }),
    abbr: Joi.string().min(1).max(50).required().pattern(/^([a-zA-Zµ()\-,]+\s)*[a-zA-Zµ()]+$/
    )
        .messages({
            'string.base': 'Geçersiz Unit Abbr İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Abbr İsmi en az 2 karakter içermeli',
            'string.max': 'Abbr İsmi en fazla 50 karakter içermeli',
        }),

    unitEqs: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz UnitEq Türü İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'UnitEq Türü en az 2 karakter içermeli',
            'string.max': 'UnitEq Türü en fazla 50 karakter içermeli',
            'string.empty': 'UnitEq Türü alanı gerekli',
        }),

    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit açıklaması',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Unit açıklaması en az 2 karakter içermeli',
            'string.max': 'Unit açıklaması  en fazla 50 karakter içermeli',
        }),
    equals: Joi.number().min(0).max(100000000000).required().precision(10)
        .messages({
            'number.base': 'Geçersiz Unit Oranı',
            'number.integer': 'Geçersiz Ondalık Miktarı',
            'number.min': 'Unit Oranı açıklaması en az 0 karakter içermeli',
            'number.max': 'Unit Oranı açıklaması  en fazla 100000000000 karakter içermeli',
        }),
})

export const updateUnit = Joi.object({
    oldName: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz Eski Unit İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Eski Unit en az 2 karakter içermeli',
            'string.max': 'Eski Unit en fazla 50 karakter içermeli',
            'string.empty': 'Eski Unit alanı gerekli',
        }),
    name: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz Unit İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 50 karakter içermeli',
            'string.empty': 'Unit alanı gerekli',
        }),
    abbr: Joi.string().min(1).max(50).pattern(/^([a-zA-Zµ()\-,]+\s)*[a-zA-Zµ()]+$/
    )
        .messages({
            'string.base': 'Geçersiz Unit Abbr İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Abbr İsmi en az 2 karakter içermeli',
            'string.max': 'Abbr İsmi en fazla 50 karakter içermeli',
        }),

    unitEqs: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz UnitEq Türü İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'UnitEq Türü en az 2 karakter içermeli',
            'string.max': 'UnitEq Türü en fazla 50 karakter içermeli',
            'string.empty': 'UnitEq Türü alanı gerekli',
        }),

    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit açıklaması',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Unit açıklaması en az 2 karakter içermeli',
            'string.max': 'Unit açıklaması  en fazla 50 karakter içermeli',
        }),
    equals: Joi.number().min(0).max(100000000000).precision(6)
        .messages({
            'number.base': 'Geçersiz Unit Oranı',
            'number.integer': 'Geçersiz Ondalık Miktarı',
            'number.min': 'Unit Oranı açıklaması en az 0 karakter içermeli',
            'number.max': 'Unit Oranı açıklaması  en fazla 100000000000 karakter içermeli',
        }),
})

export const deleteUnit = Joi.object({
    name: Joi.string().min(2).max(120).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Grubu ismi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Besin Grubu en az 2 karakter içermeli',
            'string.max': 'Besin Grubu en fazla 120 karakter içermeli',
            'string.empty': 'Unit alanı gerekli',
        })

})

//UNIT EQS//
export const unitEq = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Eq İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Unit Eq en az 2 karakter içermeli',
            'string.max': 'Unit Eq en fazla 50 karakter içermeli',
            'string.empty': 'Unit Eq alanı gerekli',
        }),
    mainUnit: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ\-(),]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz UnitEq Main Unit İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'UnitEq Main Unit en az 2 karakter içermeli',
            'string.max': 'UnitEq Main Unit en fazla 50 karakter içermeli',
            'string.empty': 'UnitEq Main Unit alanı gerekli',
        }),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Eq Info Açıklaması',
            'string.pattern.base': 'Özel Karakter içeremez',
            'string.min': 'Unit Eq açıklaması en az 2 karakter içermeli',
            'string.max': 'Unit Eq açıklaması  en fazla 50 karakter içermeli',
        }),

})

export const updateUnitEq = Joi.object({
    oldName: Joi.string().min(3).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Eski Unit Eq İsmi',
            'string.pattern.base': 'Unit Eq Eski İsmi Özel karakter içeremez',
            'string.min': 'Eski Unit Eq en az 2 karakter içermeli',
            'string.max': 'Eski Unit Eq en fazla 50 karakter içermeli',
            'string.empty': 'Eski Unit Eq alanı gerekli',
        }),
    name: Joi.string().min(3).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Eq İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Unit Eq en az 2 karakter içermeli',
            'string.max': 'Unit Eq en fazla 50 karakter içermeli',
            'string.empty': 'Unit Eq alanı gerekli',
        }),
    mainUnit: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz UnitEq Main Unit İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'UnitEq Main Unit en az 2 karakter içermeli',
            'string.max': 'UnitEq Main Unit en fazla 50 karakter içermeli',
            'string.empty': 'UnitEq Main Unit alanı gerekli',
        }),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Eq Info Açıklaması',
            'string.pattern.base': 'Özel Karakter içeremez',
            'string.min': 'Unit Eq açıklaması en az 2 karakter içermeli',
            'string.max': 'Unit Eq açıklaması  en fazla 50 karakter içermeli',
        }),
})

export const deleteUnitEq = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz Unit Eq İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'Unit Eq en az 2 karakter içermeli',
            'string.max': 'Unit Eq en fazla 50 karakter içermeli',
            'string.empty': 'Unit Eq alanı gerekli',
        }),

})

//BASE FOODS

export const baseFood = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz BaseFood İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood en az 2 karakter içermeli',
            'string.max': 'BaseFood en fazla 50 karakter içermeli',
            'string.empty': 'Base Food alanı gerekli',
        }),
    foodGroup: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz BaseFood Main foodGroup İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood foodGroup en az 2 karakter içermeli',
            'string.max': 'BaseFood foodGroup en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood foodGroup alanı gerekli',
        }),
    categorie: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz BaseFood Main categori ismi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood categorisi en az 2 karakter içermeli',
            'string.max': 'BaseFood categorisi en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood categorisi alanı gerekli',
        }),
    image: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz BaseFood Image İsmi',
            'string.pattern.base': 'BaseFood Image Özel karakter içeremez',
            'string.min': 'BaseFood Image en az 2 karakter içermeli',
            'string.max': 'BaseFood Image en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood Image alanı gerekli',
        }),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Base Food Bilgisi',
            'string.pattern.base': 'Özel Karakter içeremez',
            'string.min': 'BaseFood açıklaması en az 2 karakter içermeli',
            'string.max': 'BaseFood açıklaması  en fazla 50 karakter içermeli',
        }),
    tags: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).required().messages({
        'array.base': 'Geçersiz BaseFood Etiket Formatı',
        'array.pattern.base': 'Özel karakter içeremez',
        'array.min': 'Geçersiz BaseFood Etiket en az 2 etiket içermeli',
        'array.max': 'Geçersiz BaseFood Etiket en fazla 5 etiket içermeli',
        'string.max': 'Geçersiz BaseFood Etiket en fazla 20 karakter içermeli',
        'array.empty': 'Geçersiz BaseFood Etiket alanı gerekli',
    }),

})

export const updateBaseFood = Joi.object({
    oldName: Joi.string().min(3).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Eski BaseFood İsmi',
            'string.pattern.base': 'BaseFood Eski İsmi Özel karakter içeremez',
            'string.min': 'EskiBase Food en az 2 karakter içermeli',
            'string.max': 'EskiBase Food en fazla 50 karakter içermeli',
            'string.empty': 'EskiBase Food alanı gerekli',
        }),
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz BaseFood İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood en az 2 karakter içermeli',
            'string.max': 'BaseFood en fazla 50 karakter içermeli',
            'string.empty': 'Base Food alanı gerekli',
        }),
    foodGroup: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz BaseFood Main foodGroup İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood foodGroup en az 2 karakter içermeli',
            'string.max': 'BaseFood foodGroup en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood foodGroup alanı gerekli',
        }),
    categorie: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/).allow(null)
        .messages({
            'string.base': 'Geçersiz BaseFood Main categori ismi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood categorisi en az 2 karakter içermeli',
            'string.max': 'BaseFood categorisi en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood categorisi alanı gerekli',
        }),
    image: Joi.string().min(2).max(50).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz BaseFood Image İsmi',
            'string.pattern.base': 'BaseFood Image Özel karakter içeremez',
            'string.min': 'BaseFood Image en az 2 karakter içermeli',
            'string.max': 'BaseFood Image en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood Image alanı gerekli',
        }),
    info: Joi.string().min(1).max(200).pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ]+$/)
        .messages({
            'string.base': 'Geçersiz Base Food Bilgisi',
            'string.pattern.base': 'Özel Karakter içeremez',
            'string.min': 'BaseFood açıklaması en az 2 karakter içermeli',
            'string.max': 'BaseFood açıklaması  en fazla 50 karakter içermeli',
        }),
    tags: Joi.array().min(1).max(5).items(Joi.string().min(2).max(20)).required().messages({
        'array.base': 'Geçersiz BaseFood Etiket Formatı',
        'array.pattern.base': 'Özel karakter içeremez',
        'array.min': 'Geçersiz BaseFood Etiket en az 2 etiket içermeli',
        'array.max': 'Geçersiz BaseFood Etiket en fazla 5 etiket içermeli',
        'string.max': 'Geçersiz BaseFood Etiket en fazla 20 karakter içermeli',
        'array.empty': 'Geçersiz BaseFood Etiket alanı gerekli',
    })
})

export const deleteBaseFood = Joi.object({
    name: Joi.string().min(2).max(50).required().pattern(/^([a-zA-ZğüşöçıİĞÜŞÖÇ()\-,]+\s)*[a-zA-ZğüşöçıİĞÜŞÖÇ()]+$/)
        .messages({
            'string.base': 'Geçersiz BaseFood İsmi',
            'string.pattern.base': 'Özel karakter içeremez',
            'string.min': 'BaseFood en az 2 karakter içermeli',
            'string.max': 'BaseFood en fazla 50 karakter içermeli',
            'string.empty': 'BaseFood alanı gerekli',
        }),

})




/* .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': 'Şifreler Eşleşmeli'}), */