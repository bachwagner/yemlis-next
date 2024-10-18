import React from 'react'
import FormFrame from './FormFrame';
import OItemCreateInputs from './InputFields';

function FormContent({
    formName,
    itemTypes,
    units,
    unitEquivalents,
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
            <OItemCreateInputs
                isPending={isPending}
                itemTypes={itemTypes}
                units={units}
                unitEquivalents={unitEquivalents}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
                watch={watch}
            />
        </FormFrame>);
}


export default FormContent