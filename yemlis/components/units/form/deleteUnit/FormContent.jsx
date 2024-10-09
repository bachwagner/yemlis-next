import React from 'react'
import FormFrame from './FormFrame';
import UnitDeleteInputs from './InputFields';

function FormContent({
    units,
    formName,
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
            <UnitDeleteInputs
                units={units}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
            />
        </FormFrame>);
}


export default FormContent