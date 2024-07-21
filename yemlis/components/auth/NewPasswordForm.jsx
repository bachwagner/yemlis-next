'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import CustomLink from '@/components/inputs/CustomLink';
import { Typography } from '@mui/material';
import { newPassword } from '@/app/lib/actions/new-password';
import { newPassword as passwordsValidation } from '@/app/lib/validationSchemas'
import { useSearchParams } from 'next/navigation';

export function FormContent({ register, isPending, errors }) {
    const onClick = (provider) => {

    }
    return (
        <>
            <Grid container spacing={2}>

                <Grid item xs={12} textAlign="center">
                    {errors.serverError && <Typography
                        color="crimson"
                        fontWeight="bold"
                    >
                        {errors.serverError.message}
                    </Typography>}
                    <Box display="flex" alignItems="center" justifyContent="center">

                        <FormControl >
                            <TextField
                                name="password"
                                label="Yeni Şifre"
                                type='password'
                                required
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                autoComplete="off"
                                autoFocus
                                error={errors.password ? true : false}
                                helperText={errors.password && errors.password.message}
                                sx={{ width: "400px",mb:3 }}
                                {...register("password")}
                            />
                            <TextField
                                name="repeatpassword"
                                label="Yeni Şifre Tekrarı"
                                type='password'
                                required
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                autoComplete="off"
                                autoFocus
                                error={errors.repeatpassword ? true : false}
                                helperText={errors.repeatpassword && errors.repeatpassword.message}
                                sx={{ width: "400px" }}
                                {...register("repeatpassword")}
                            />
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button
                        type="submit"
                        form="my-form-id"
                        fullWidth
                        variant="contained"
                        disabled={isPending}
                        sx={{ mt: 3, mb: 1, width: "400px" }}
                    >
                        Şifreyi Değiştir
                    </Button>
                </Box >
            </Grid>

            <Grid item xs={12} >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box display="block" textAlign="right" width="400px">
                        <CustomLink target="/" label="Anasayfa" />
                        <br />
                        <CustomLink target="/auth/login" label="Giriş Sayfası" />
                        <br />
                    </Box >
                </Box >
            </Grid>
        </>
    )
}
export default function NewPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)

    const { register, handleSubmit, setError, formState: { isValid, errors } } = useForm({
        mode: "all",
        // resolver: joiResolver(loginValidation),
        resolver: joiResolver(passwordsValidation/* ,{language:'de'} */)
    })
    useEffect(() => {

    })

    const formRef = useRef(null);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <Box display="flex" alignItems="center" justifyContent="center" >
                {serverStatus?.error && <Alert sx={{ mb: 1, width: "400px" }} severity="error"> Server Mesajı: {serverStatus?.message}</Alert>}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" >
                {serverStatus?.success && <Alert sx={{ mb: 1, width: "400px" }} severity="success"> Server Mesajı: {serverStatus?.message}</Alert>}
            </Box>
            <form
                ref={formRef}
                action={newPassword}
                id="my-form-id"
                name='my-form-id'
                onSubmit={(evt) => {
                    evt.preventDefault()
                    handleSubmit((values) => {
                        console.log("values")
                        console.log(values)
                        try {
                            startTransition(() => {
                                newPassword(values,token).then((data) => {
                                    setServerStatus(data)
                                }).catch((error) => {
                                    setServerStatus({ error: true, message: "Beklenmedik Bir Hata Oluştu" })
                                })
                            })
                        } catch (e) {
                            setIsLoading(false)
                            setServerStatus({ error: true, message: "Beklenmedik Bir Hata Oluştu" })
                            console.log(e)
                        }
                    })(evt);
                }} >

                {/* Client Message: {errors && mapErrors(errors)} <br /> */}

                <FormContent
                    register={register}
                    isValid={isValid}
                    errors={errors}
                    isPending={isPending}
                />
            </form>
        </Box>

    )
}

