"use client"
import { useCallback, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Typography } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { newVerification } from "@/app/lib/newVerification"
import { Alert } from "@mui/material"

export const NewVerificationForm = () => {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState()
    const token = searchParams.get('token')
    const onSubmit = useCallback(() => {
        if (!token) {
            setStatus({ error: true, message: "Token Eksik" })
            return
        }

        newVerification(token)
            .then((data) => {
                setStatus({ error: data.error, success: data.success, message: data.message })
            })
            .catch((err) => {
                setStatus({ error: true, success: false, message: "Beklenmedik Bir Hata Oluştu" })

            })
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit]) 
    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography variant="h5" p={1}>
                Email Doğrulanıyor
            </Typography>
            {
            !status?<CircularProgress p={1} />
            :<Alert
                severity={status?.error ? "error" : status?.success ? "success" : "info"}>
                {status?.message}
            </Alert>}
        </Box>
    )

}