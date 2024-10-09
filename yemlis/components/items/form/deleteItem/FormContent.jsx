import React from 'react'
import FormFrame from './FormFrame';
import BasicSettings from './InputFields';
import ItemDeleteInputs from './InputFields';

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
            <ItemDeleteInputs
                items={items}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
            />
        </FormFrame>);
}


export default FormContent