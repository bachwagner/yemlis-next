import React from 'react'
import FormFrame from './FormFrame';
import UnitEqsUpdateInputs from './InputFields';

function FormContent({
    units,
    unitEqs,
    formName,
    isPending,
    isDirty,
    errors,
    serverStatus,
    register,
    control,
    getValues,
    watch,
    reset,
    setValue,
    setError,
    resetField
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            serverStatus={serverStatus}
        >
            <UnitEqsUpdateInputs
                units={units}
                unitEqs={unitEqs}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
                watch={watch}
                reset={reset}
                setValue={setValue}
                isPending={isPending}
                setError={setError}
                resetField={resetField}

            />
        </FormFrame>);
}


export default FormContent