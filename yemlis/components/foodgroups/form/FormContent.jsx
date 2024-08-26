import React from 'react'
import FormFrame from './FormFrame';
import BasicSettings from './InputFields';
import FoodGroupCreateInputs from './InputFields';

function FormContent({
    formName,
    foodGroups,
    isPending,
    isDirty,
    errors,
    serverStatus,
    register,
}) {

    return (
        <FormFrame
            formName={formName}
            isPending={isPending}
            isDirty={isDirty}
            errors={errors}
            serverStatus={serverStatus}
        >
            <FoodGroupCreateInputs
                foodGroups={foodGroups}
                errors={errors}
                register={register}
            />
        </FormFrame>);
}


export default FormContent