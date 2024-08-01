import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useFormState, useFormStatus } from 'react-dom'

export default function FormFrame({
    formName,
    isPending,
    user,
    serverStatus,
    children
}) {
    const { pending } = useFormStatus()
    console.log("user delete account")
    console.log(user)

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
                <Grid item xs={12}>
                    {pending && "Gönderiliyor.."}
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {children}
                        <Button
                            type="submit"
                            form={formName}
                            fullWidth
                            variant="contained"
                            color="error"
                            sx={{ mb: 1, p: 1 }}
                            disabled={isPending}
                        >
                            Hesabı Sil
                        </Button>
                    </Box >
                </Grid>

            </Grid>
        </>
    )
}