'use client'
import React from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './FormTemplate';
import { deleteFoodGroup as deleteFoodGroupValidation } from '@/app/lib/validationSchemas'
import { deleteItem  as deleteItemAction } from '@/app/lib/actions/items';

import { deleteItem as deleteItemValidation } from '@/app/lib/validationSchemas';

export default function DeleteItemForm({ items }) {

    const defaultValues = {
        name: null
    }

    return (

        items ? <Box key="item" name="item" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                items={items}
                formName="delete-item"
                validation={deleteItemValidation}
                defaultValues={defaultValues}
                actionFunc={deleteItemAction}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

