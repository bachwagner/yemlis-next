'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';

import { updateUnitEq as unitEqAction } from '@/app/lib/actions/unitEqs';
import { updateUnitEq as unitEqValidation } from '@/app/lib/validationSchemas';
export default function UpdateUnitEqsForm({ units, unitEqs }) {

    const defaultValues = {
        oldName: null,
        name: "",
        info: "",
        mainUnit: null,  // TO CHECK

    }

    return (
        (units) ? <Box key="updateUnitEq" name="updateUnitEq" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >

            <FormTemplate
                units={units}
                unitEqs={unitEqs}
                formName="update-uniteqs"
                validation={unitEqValidation}
                defaultValues={defaultValues}
                actionFunc={unitEqAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

