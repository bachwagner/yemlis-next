'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { deleteItem as deleteItemValidation } from '@/app/lib/validationSchemas';
import { deleteOItem as deleteOItemAction } from '@/app/lib/actions/oitems';
export default function DeleteOItemForm({ items }) {

    const defaultValues = {
        name: null
    }

    return (

        items ? <Box key="oitem" name="oitem" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                items={items}
                formName="delete-oitem"
                validation={deleteItemValidation}
                defaultValues={defaultValues}
                actionFunc={deleteOItemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

