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
import { reset } from '@/app/lib/actions/reset';
import Joi from 'joi';
import { justEmail as emailValidation } from '@/app/lib/validationSchemas'
 
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
                                name="email"
                                label="Email"
                                required
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                autoComplete="off"
                                autoFocus
                                error={errors.email ? true : false}
                                helperText={errors.email && errors.email.message}
                                sx={{ width: "400px" }}
                                {...register("email")}
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
                        Şifre Sıfırlama Emaili Gönder
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
export default function ResetForm() {
    // const [state, formAction] = useFormState(authLogin, null)
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)

    const dummyJoiSchema = Joi.object({
        email: Joi.string().messages({
            'string.email': 'Geçersiz  email adresi',
        })
    })
    const { register, handleSubmit, setError, formState: { isValid, errors } } = useForm({
        mode: "all",
        // resolver: joiResolver(loginValidation),
        resolver: joiResolver(emailValidation/* ,{language:'de'} */)
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
                action={reset}
                id="my-form-id"
                name='my-form-id'
                onSubmit={(evt) => {
                    evt.preventDefault()
                    handleSubmit((values) => {
                        console.log("values")
                        console.log(values)
                        try {
                            startTransition(() => {
                                reset(values).then((data) => {
                                    console.log("data recevied", data?.message)
                                    setServerStatus(data)
                                    console.log("data")
                                    console.log(data)
                                    console.log("data.error")
                                    console.log(data?.error)
                                }).catch((error) => {
                                    console.log("promise error")
                                    console.log(error)
                                    console.log("error.message")
                                    console.log(error.message)
                                    setServerStatus({ error: true, message: "Beklenmedik Bir Hata Oluştu" })
                                })

                            })

                            console.log("success handle submit")

                        } catch (e) {
                            setIsLoading(false)
                            setServerStatus({ error: true, message: "Beklenmedik Bir Hata Oluştu" })
                            console.log("error handle submit")
                            console.log(e)

                            // handle your error
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

