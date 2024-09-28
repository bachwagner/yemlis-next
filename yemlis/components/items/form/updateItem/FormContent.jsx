import React from 'react'
import FormFrame from './FormFrame';
import ItemUpdateInputs from './InputFields';

function FormContent({
    items,
    itemTypes,
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
    setValue
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            serverStatus={serverStatus}
        >
            <ItemUpdateInputs
                items={items}
                itemTypes={itemTypes}
                errors={errors}
                register={register}
                control={control}
                getValues={getValues}
                watch={watch}
                reset={reset}
                setValue={setValue}
            />
        </FormFrame>);
}


export default FormContent