'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { updateItem as updateItemValidation } from '@/app/lib/validationSchemas';
import { updateOItem as itemAction  } from '@/app/lib/actions/oitems';
export default function UpdateItemForm({ items,itemTypes, units, unitEquivalents }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        oldName: null,
        name: "",
        usdaName: "",
        formula: undefined,
        info: undefined,
        itemType: null,  // TO CHECK
        measureUnits: []
    }

    /*  useEffect(() => {
         console.log("user s")
         console.log(user)
     }, [user]) */

    return (
        itemTypes ? <Box key="updateItem" name="updateItem" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >

            <FormTemplate
                items={items}
                units={units}
                unitEquivalents={unitEquivalents}
                itemTypes={itemTypes}
                formName="update-oitem"
                validation={updateItemValidation}
                defaultValues={defaultValues}
                actionFunc={itemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

