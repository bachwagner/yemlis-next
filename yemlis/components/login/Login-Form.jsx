'use client'
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useFormState, useFormStatus } from 'react-dom'
//import { useForm, Controller, useFormState } from "react-hook-form"
import CustomLink from '../inputs/CustomLink';
import TextField from '@mui/material/TextField';
import { authenticate } from '@/app/lib/actions';
import { useForm } from 'react-hook-form';
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Alert } from '@mui/material';

//import ErrorMessage from "../../../components/layouts/ErrorMessage"

export function FormContent({ register, isValid, errors }) {
    const { pending } = useFormStatus();


    return (
        <>
            <Grid container spacing={2}>
                {/* <ErrorMessage /> */}
                {pending && "Gönderiliyor.."}
                <Grid item xs={12}>
                    {/* {state && state?.message} */}
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            InputLabelProps={{ shrink: true }}
                            autoComplete='email'
                            fullWidth
                            error={errors.email ? true : false}
                            helperText={errors.email && errors.email.message}
                            sx={{ width: "400px" }}
                            {...register("email")}
                        />
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
                        sx={{ mt: 3, mb: 2, width: "400px" }}
                        disabled={!isValid}
                    >
                        Giriş Yap
                    </Button>
                </Box >

            </Grid>

            <Grid item xs={12} >
            <Box display="flex" alignItems="center" justifyContent="center">

                <Box display="block" textAlign="right" width="400px">

                <CustomLink target="/" label="Anasayfa" />
                    <br />
                    <CustomLink target="/signup" label="Hesabın yok mu? Kayıt Ol" />
                    <br />
                    <CustomLink target="/forgotpassword" label="Şifremi Unuttum" />
                    <br />
                    <CustomLink target="/" label="Anasayfa" />
                </Box >
                </Box >

            </Grid>
           
        </>
    )

}
export default function SignInForm() {

    const [state, formAction] = useFormState(authenticate, null);
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(6).required()
    });
    const mapErrors = (object) => {
        const listErrorsKeys = Object.keys(object)
        const listErrors = listErrorsKeys.map((key) => {
            const errorMessage = object[key].message

            return (<li>{errorMessage}</li>)

        })

        return listErrors

    }

    const { register, formState: { isValid, errors } } = useForm({
        mode: "all",
        resolver: joiResolver(schema)
    });
    console.log("errorss")
    console.log(errors)
    console.log("isValid")
    console.log(isValid)

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <Box display="flex" alignItems="center" justifyContent="center" >
                {(state && state?.status === "error") && <Alert sx={{ mb: 1,width:"400px" }} severity="error"> Server  Message: {state?.message}</Alert>}
            </Box>
            <form action={formAction} id="my-form-id" name='my-form-id'  >
                {/* Client Message: {errors && mapErrors(errors)} <br /> */}
                <FormContent
                    register={register}
                    isValid={isValid}
                    errors={errors} />

            </form>
        </Box>

    )
}

