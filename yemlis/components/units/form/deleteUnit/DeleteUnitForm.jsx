'use client'
import React from 'react'
import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { deleteUnit as deleteUnitValidation } from '@/app/lib/validationSchemas';
import { deleteUnit as deleteUnitAction } from '@/app/lib/actions/units';
export default function DeleteUnitForm({ units }) {

    const defaultValues = {
        name: null
    }

    return (

        units ? <Box key="item" name="item" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                units={units}
                formName="delete-item"
                validation={deleteUnitValidation}
                defaultValues={defaultValues}
                actionFunc={deleteUnitAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

