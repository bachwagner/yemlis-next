'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { deleteFoodGroup as deleteFoodGroupValidation } from '@/app/lib/validationSchemas'
import { deleteFoodGroup as foodGroupAction } from "@/app/lib/actions/foodGroups"

export default function DeleteFoodGroupForm({ foodGroups }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        name: null
    }
    /*  useEffect(() => {
         console.log("user s")
         console.log(user)
     }, [user]) */

    return (

        foodGroups ? <Box key="foodGroup" name="foodGroup" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                foodGroups={foodGroups}
                formName="delete-food-group"
                validation={deleteFoodGroupValidation}
                defaultValues={defaultValues}
                actionFunc={foodGroupAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

