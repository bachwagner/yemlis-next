import React from 'react'
import FormFrame from './FormFrame';
import ItemCreateInputs from './InputFields';

function FormContent({
    formName,
    itemTypes,
    isPending,
    isDirty,
    errors,
    serverStatus,
    register,
    control,
    getValues
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            serverStatus={serverStatus}
        >
            <ItemCreateInputs
                itemTypes={itemTypes}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
            />
        </FormFrame>);
}


export default FormContent