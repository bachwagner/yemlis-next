import React from 'react'
import FormFrame from './FormFrame';
import BasicSettings from './InputFields';

function FormContent({
    formName,
    user,
    isPending,
    isDirty,
    errors,
    serverStatus,
    register,
    resetField,
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            user={user}
            serverStatus={serverStatus}
        >
            <BasicSettings
                user={user}
                errors={errors}
                register={register}
                resetField={resetField}
            />
        </FormFrame>);
}


export default FormContent