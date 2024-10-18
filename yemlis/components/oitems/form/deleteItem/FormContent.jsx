import React from 'react'
import FormFrame from './FormFrame';
import OItemDeleteInputs from './InputFields';

function FormContent({
    formName,
    items,
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
            <OItemDeleteInputs
                items={items}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
            />
        </FormFrame>);
}


export default FormContent