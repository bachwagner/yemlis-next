import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import  Alert  from '@mui/material/Alert';
import { useFormState, useFormStatus } from 'react-dom'

export default function FormFrame({
    formName,
    isPending,
    isDirty,
    errors,
    serverStatus,
    children
}) {
    const { pending } = useFormStatus()
    const [open, setOpen] = useState(false)
    const errorLength = Object.keys(errors).length

    return (
        <>
        <Box display="flex" alignItems="center" justifyContent="center" >
            {serverStatus &&
                <Alert sx={{ mb: 1, width: "400px" }}
                    severity={
                        serverStatus.error ? "error"
                            : serverStatus.success ? "success"
                                : "info"}>
                    Server Mesajı: {serverStatus?.message}</Alert>}
        </Box>
            <Grid container spacing={2}>
                {/* <ErrorMessage /> */}
                <Grid item xs={12} textAlign="center">
                    {/* {state && state?.message} */}
                    {pending && "Gönderiliyor.."}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center">
                        {children}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button
                            type="submit"
                            form={formName}
                            fullWidth
                            variant="contained"
                            sx={{ mb: 1, p: 1 }}
                            disabled={isPending || !isDirty || errorLength > 0}
                        >
                            Kaydet
                        </Button>
                    </Box >
                </Grid>

            </Grid>
        </>
    )
}