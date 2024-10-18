'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { item as itemValidation } from '@/app/lib/validationSchemas'
import { createOItem as oItemAction } from '@/app/lib/actions/oitems';

export default function CreateOItemForm({ itemTypes,units,unitEquivalents }) {

    const defaultValues = {
        measureUnits:[]
   }
    return (

        itemTypes ? <Box key="oitem" name="oitem" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                itemTypes={itemTypes}
                units={units}
                unitEquivalents={unitEquivalents}
                formName="create-oitem" 
                validation={itemValidation}
                defaultValues={defaultValues}
                actionFunc={oItemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

