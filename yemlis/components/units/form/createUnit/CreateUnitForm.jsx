'use client'
import React  from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';

import { unit as unitValidation } from '@/app/lib/validationSchemas';
import { createUnit as unitAction } from '@/app/lib/actions/units';

export default function CreateUnitForm({ unitEqs }) {

    const defaultValues = {

    }
    return (

        unitEqs ? <Box key="unit" name="unit" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                unitEqs={unitEqs}
                formName="create-unit"
                validation={unitValidation}
                defaultValues={defaultValues}
                actionFunc={unitAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

