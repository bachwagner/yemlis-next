'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'
import Box from '@mui/material/Box'
import FormTemplate from './form/FormTemplate'
import { deleteAccount as deleteAccountValidation } from '@/app/lib/validationSchemas'
import { deleteAccount } from "@/app/lib/actions/deleteAccount"
import { Alert } from '@mui/material'

export default function DeleteUserAccount({ user }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        demandType: undefined,  //opposite isMarkToDelete
    }
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            {!user.isMarkedToDelete ?
                <Alert variant="filled" severity="error" sx={{ mb: 1 }}>
                    Gerçekten Hesabını Silmek İstiyor Musun?
                </Alert> :
                <Alert variant="filled" severity="warning" sx={{ mb: 1 }}>
                    Hesabını Silme Talebi Gönderdin, İptal Edebilirsin
                </Alert>}
            <FormTemplate
                user={user}
                formName="delete-user"
                deleteAccountValidation={deleteAccountValidation}
                defaultValues={defaultValues}
                actionFunc={deleteAccount}
                children
            />
        </Box>
    )
}

