'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';

import { createUnitEq as unitEqAction } from '@/app/lib/actions/unitEqs';
import { unitEq as unitEqValidation } from '@/app/lib/validationSchemas';
import { baseFood as baseFoodValidation } from '@/app/lib/validationSchemas';
export default function CreateBaseFoodForm({ units }) {

    const defaultValues = {

    }
    return (

        units ? <Box key="unit" name="unit" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                units={units}
                formName="create-basefood"
                validation={baseFoodValidation}
                defaultValues={defaultValues}
                actionFunc={unitEqAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

