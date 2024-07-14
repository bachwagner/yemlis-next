'use client'
import React, { useState } from 'react'
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import  Typography  from '@mui/material/Typography';
import CustomLink from '../../inputs/CustomLink';
import { authLogin } from '@/app/lib/actions/actions';
import { login as loginValidation } from '../../../app/lib/validationSchemas'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export function FormContent({ register, isValid, setError, errors }) {

    return (
        <>
            <Grid container spacing={2}>
                {/* <ErrorMessage /> */}
                <Grid item xs={12} textAlign="center">

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
                        sx={{ mt: 3, mb: 1, width: "400px" }}
                    /* disabled={!isValid} */
                    >
                        Giriş Yap
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
                        onClick={() => console.log("Google Login")}>

                        <GoogleIcon /> &nbsp;  Google ile Giriş Yap
                    </Button>
                </Box >
            </Grid>
            <Grid item xs={12} >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box display="block" textAlign="right" width="400px">
                        <CustomLink target="/" label="Anasayfa" />
                        <br />
                        <CustomLink target="/register" label="Hesabın yok mu? Kayıt Ol" />
                        <br />
                        <CustomLink target="/auth/forgotpassword" label="Şifremi Unuttum" />
                        <br />
                    </Box >
                </Box >
            </Grid>
        </>
    )
}
export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async (data) => {
        console.log("login form sent")
        console.log(data)
        setLoading(true)
        try {
            const res = await signIn(
                'credentials', {
                email:data.email,
                password:data.password,
                redirect: false
            })
            if (res.error) {
                setError(
                    "serverError",
                    {
                        type: "custom",
                        message: "Geçersiz Kimlik Bilgileri"
                    })
                    return
            }
            router.replace('dashboard')
        } catch (error) {
            console.log("Error")
            console.log(error)
        }

    }
    const { register, handleSubmit, setError, formState: { isValid, errors } } = useForm({
        mode: "all",
        // resolver: joiResolver(loginValidation),
        resolver: joiResolver(loginValidation/* ,{language:'de'} */)
    })
    console.log("errorss")
    console.log(errors)

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >

            {loading && "Gönderiliyor"}
            {errors.serverError && <Typography
                color="crimson"
                fontWeight="bold"
            >
                {errors.serverError.message}
            </Typography>}
            <form
                onSubmit={handleSubmit(onSubmit)}
                id="my-form-id"
                name='my-form-id'  >
                {/* Client Message: {errors && mapErrors(errors)} <br /> */}
                <FormContent
                    register={register}
                    isValid={isValid}
                    errors={errors}
                    setError={setError} />
            </form>
        </Box>

    )
}

