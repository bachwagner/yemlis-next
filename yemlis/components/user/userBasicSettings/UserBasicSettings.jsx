'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'

import Box from '@mui/material/Box';

import FormTemplate from './form/FormTemplate';
import { settings as settingValidation } from '@/app/lib/validationSchemas'
import { settings } from "@/app/lib/actions/settings"

export default function UserBasicSettings({ user }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const defaultValues = {
        name: user?.name || undefined,
        email: user?.email || undefined,
        password: undefined,
        newpassword: undefined,
    }
   /*  useEffect(() => {
        console.log("user s")
        console.log(user)
    }, [user]) */
    return (

        user ? <Box key="UserBasicSettings" name="UserBasicSettings" display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <FormTemplate
                user={user}
                formName="basic-settings"
                settingValidation={settingValidation}
                defaultValues={defaultValues}
                actionFunc={settings}
                children
            />
        </Box> : <>Servere Ulaşılamadı</>

    )
}

