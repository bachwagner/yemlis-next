'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { updateFoodGroup as foodGroupValidation } from '@/app/lib/validationSchemas'
import { updateFoodGroup as foodGroupAction } from "@/app/lib/actions/foodGroups"
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

export default function UpdateFoodGroupForm({ foodGroups }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        oldName: null,
        name: "",
        parent: "",
        noParent: "",
        tags: []
    }

    /*  useEffect(() => {
         console.log("user s")
         console.log(user)
     }, [user]) */

    return (
        foodGroups ? <Box key="foodGroup" name="foodGroup" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >



            <FormTemplate
                foodGroups={foodGroups}
                formName="update-food-group"
                validation={foodGroupValidation}
                defaultValues={defaultValues}
                actionFunc={foodGroupAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

