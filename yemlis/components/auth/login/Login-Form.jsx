'use client'
import React, { startTransition, useRef, useState, useEffect } from 'react'
import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import CustomLink from '../../inputs/CustomLink';
import { Typography } from '@mui/material';
import { authLogin } from '@/app/lib/actions';
import Joi from 'joi';
import { login, login as loginValidation } from '../../../app/lib/validationSchemas'
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/routes';
export function FormContent({ register, isPending, errors }) {
    const onClick = (provider) => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT_URL,

        })
    }
    return (
        <>
            <Grid container spacing={2}>
                {/* <ErrorMessage /> */}
                <Grid item xs={12} textAlign="center">
                    {/* {state && state?.message} */}
                    {/* {pending && "Gönderiliyor.."}  */}
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
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <TextField
                            name="password"
                            label="Şifre"
                            type="password"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            autoComplete='current-password'
                            error={errors.password ? true : false}
                            helperText={errors.password && errors.password.message}
                            sx={{ width: "400px" }}
                            {...register("password")}
                        />
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
                    /* disabled={!isValid} */
                    >
                        {!isPending ? "Giriş Yap" : "Gönderiliyor"}
                    </Button>
                </Box >
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 1, width: "400px" }}
                        onClick={() => onClick("google")}>

                        <GoogleIcon /> &nbsp;  Google ile Giriş Yap
                    </Button>
                </Box >
            </Grid>
            <Grid item xs={12} >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box display="block" textAlign="right" width="400px">
                        <CustomLink target="/" label="Anasayfa" />
                        <br />
                        <CustomLink target="/auth/register" label="Hesabın yok mu? Kayıt Ol" />
                        <br />
                        <CustomLink target="/auth/resetpassword" label="Şifremi Unuttum" />
                        <br />
                    </Box >
                </Box >
            </Grid>
        </>
    )
}
export default function LoginForm() {
    // const [state, formAction] = useFormState(authLogin, null)
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    console.log("urlError")
    console.log(urlError)
    const dummyJoiSchema = Joi.object({
        email: Joi.string().messages({
            'string.email': 'Geçersiz  email adresi',
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Şifre en az 6 karakter içermeli',
            'string.empty': 'Şifre alanı gerekli',
        })
    })
    const { register, handleSubmit, setError, formState: { isValid, errors } } = useForm({
        mode: "all",
        // resolver: joiResolver(loginValidation),
        resolver: joiResolver(loginValidation/* ,{language:'de'} */)
    })
    useEffect(()=>{
        if (urlError) setServerStatus({error:true,message:"Bu email başka ile başla sağlayıcıdan kayıt oluşturulmuş"})

    },[urlError])
    console.log("errorss")
    console.log(errors)
    console.log("serverStatus")
    console.log(serverStatus)

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
                action={authLogin}
                id="my-form-id"
                name='my-form-id'
                onSubmit={(evt) => {
                    evt.preventDefault()
                    handleSubmit((values) => {
                        console.log("values")
                        console.log(values)
                        try {
                            startTransition(() => {
                                authLogin(values).then((data) => {
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

