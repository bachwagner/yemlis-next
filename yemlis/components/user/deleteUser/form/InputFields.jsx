import React from 'react'

function DeleteAccount(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const register = props.register
    
    return (
        <>
            <input
                {...register("demandType",
                    { value: "deleteAccount" })}
                type="hidden" />
        </>
    )
}

export default DeleteAccount