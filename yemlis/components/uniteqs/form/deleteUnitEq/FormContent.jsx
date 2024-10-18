import React from 'react'
import FormFrame from './FormFrame';
import UnitEqDeleteInputs from './InputFields';

function FormContent({
    unitEqs,
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
            <UnitEqDeleteInputs
                unitEqs={unitEqs}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
            />
        </FormFrame>);
}


export default FormContent