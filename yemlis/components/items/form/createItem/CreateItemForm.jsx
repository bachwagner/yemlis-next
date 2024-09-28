'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { item as itemValidation } from '@/app/lib/validationSchemas'
import { createItem as itemAction} from '@/app/lib/actions/items';


export default function CreateItemForm({ itemTypes }) {

    const defaultValues = {
   }
    return (

        itemTypes ? <Box key="item" name="item" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                itemTypes={itemTypes}
                formName="create-item"
                validation={itemValidation}
                defaultValues={defaultValues}
                actionFunc={itemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

