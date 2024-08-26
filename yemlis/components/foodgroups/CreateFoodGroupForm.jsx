'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './form/FormTemplate';
import { foodGroup as foodGroupValidation } from '@/app/lib/validationSchemas'
import { foodGroup as foodGroupAction } from "@/app/lib/actions/foodGroups"

export default function CreateFoodGroupForm({ foodGroups }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {

    }
    /*  useEffect(() => {
         console.log("user s")
         console.log(user)
     }, [user]) */
    return (

        foodGroups ? <Box key="foodGroup" name="foodGroup" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                foodGroups={foodGroups}
                formName="create-food-group"
                validation={foodGroupValidation}
                defaultValues={defaultValues}
                actionFunc={foodGroupAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

