'use client'
import React from 'react'
import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { deleteUnitEq as deleteUnitEqAction } from '@/app/lib/actions/unitEqs';
import { deleteUnitEq as deleteUnitEqValidation } from '@/app/lib/validationSchemas';

export default function DeleteUnitEqForm({ unitEqs }) {

    const defaultValues = {
        name: null
    }

    return (

        unitEqs ? <Box key="item" name="item" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                unitEqs={unitEqs}
                formName="delete-uniteq"
                validation={deleteUnitEqValidation}
                defaultValues={defaultValues}
                actionFunc={deleteUnitEqAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

