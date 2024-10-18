import React from 'react'
import FormFrame from './FormFrame';
import UnitEqCreateInputs from './InputFields';

function FormContent({
    units,
    formName,
    isPending,
    isDirty,
    errors,
    serverStatus,
    register,
    control,
    getValues,
    watch
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            serverStatus={serverStatus}
        >
            <UnitEqCreateInputs
                units={units}
                isPending={isPending}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
                watch={watch}
            />
        </FormFrame>);
}


export default FormContent