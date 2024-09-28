import React from 'react'
import FormFrame from './FormFrame';
import BasicSettings from './InputFields';
import FoodGroupUpdateInputs from './InputFields';

function FormContent({
    formName,
    foodGroups,
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

            <FoodGroupUpdateInputs
                foodGroups={foodGroups}
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