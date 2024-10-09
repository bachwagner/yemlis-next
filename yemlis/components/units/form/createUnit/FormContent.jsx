import React from 'react'
import FormFrame from './FormFrame';
import UnitCreateInputs from './InputFields';

function FormContent({
    unitEqs,
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
            <UnitCreateInputs
                unitEqs={unitEqs}
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