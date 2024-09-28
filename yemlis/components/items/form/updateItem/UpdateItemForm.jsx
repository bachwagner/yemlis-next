'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { updateItem as updateItemValidation } from '@/app/lib/validationSchemas';
import { updateItem as  itemAction} from '@/app/lib/actions/items';
export default function UpdateItemForm({ itemTypes, items }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        name: "",
        usdaName: "",
        formula: undefined,
        info: undefined,
        itemType: null  // TO CHECK
    }

    /*  useEffect(() => {
         console.log("user s")
         console.log(user)
     }, [user]) */

    return (
        itemTypes ? <Box key="foodGroup" name="foodGroup" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >

            <FormTemplate
                items={items}
                itemTypes={itemTypes}
                formName="update-food-group"
                validation={updateItemValidation}
                defaultValues={defaultValues}
                actionFunc={itemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

