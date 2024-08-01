import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'

function BasicSettings(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const user = props.user
    const errors = props.errors
    const register = props.register
    const resetField = props.resetField
    console.log("****user")
    console.log(user)
    return (
        <> <InputEditPair
            name="name"
            label="İsim"
            type="text"
            errors={errors}
            buttonLabel="İsim Değiştir"
            register={register}
            resetField={resetField}
        />
            {user?.isOAuth === false && (<>
                <InputEditPair
                    name="email"
                    label="Email"
                    type="email"
                    errors={errors}
                    register={register}
                    buttonLabel="Emaili Değiştir"
                    resetField={resetField}
                />
                <OldAndNewPassword
                    required={false}
                    errors={errors}
                    register={register}
                    resetField={resetField}
                />

                {/* <PasswordsEditPair
                required={false}
                errors={errors}
                register={register}
                resetField={resetField}
            /> */ }
            </>
            )
            }
        </>
    )
}

export default BasicSettings