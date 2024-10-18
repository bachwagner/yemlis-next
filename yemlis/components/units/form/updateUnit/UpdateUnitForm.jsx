'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { updateUnit as updateUnitValidation } from '@/app/lib/validationSchemas';
import { updateUnit as updateUnitAction } from '@/app/lib/actions/units';
export default function UpdateUnitForm({ units, unitEquivalents }) {

    const defaultValues = {
        oldName: null,
        name: "",
        abbr: "",
        info: "",
        equals:null,
        unitEqs: null,  // TO CHECK

    }

    return (
        (units && unitEquivalents) ? <Box key="updateUnit" name="updateUnit" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >

            <FormTemplate
                units={units}
                unitEquivalents={unitEquivalents}
                formName="update-unit"
                validation={updateUnitValidation}
                defaultValues={defaultValues}
                actionFunc={updateUnitAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

