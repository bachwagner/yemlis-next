import React from 'react'
import FormFrame from './FormFrame';
import DeleteAccount from './InputFields';
function FormContent({
    formName,
    user,
    isPending,
    serverStatus,
    register
    }) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            user={user}
            serverStatus={serverStatus}
        >
            <DeleteAccount
                register={register}
            />
        </FormFrame>);
}


export default FormContent