import React from 'react'
import FormFrame from './FormFrame';
import OItemUpdateInputs from './InputFields';

function FormContent({
    items,
    itemTypes,
    units,
    unitEquivalents,
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
            <OItemUpdateInputs
                items={items}
                itemTypes={itemTypes}
                units={units}
                unitEquivalents={unitEquivalents}
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