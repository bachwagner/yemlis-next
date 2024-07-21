'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react';
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import CheckBox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormState, useFormStatus } from 'react-dom'
import CustomLink from '@/components/inputs/CustomLink';
import { settings } from "@/app/lib/actions/settings"
import { settings as settingValidation } from '@/app/lib/validationSchemas'
import { Link } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import InputEditPair from './InputPairs/TextInputEditPair';
import PasswordsEditPair from './InputPairs/PasswordsEditPair';
import OldAndNewPassword from './InputPairs/OldAndNewPassword';
import DeleteAccount from './DeleteAccount';

export function FormContent({
    register,
    isPending,
    control,
    setValue,
    isDirty,
    resetField,
    errors,
    user }) {
    const { pending } = useFormStatus()
    const [open, setOpen] = useState(false)
    const errorLength = Object.keys(errors).length
    console.log("user settings")
    console.log(user)

    return (
        <>
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
                        {/*   <FormControl >
                            <TextField
                                name="name"
                                label="İsim"
                                type='text'
                                required
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                autoComplete="off"
                                autoFocus
                                error={errors.name ? true : false}
                                helperText={errors.name && errors.name.message}
                                sx={{ width: "300px" }}
                                size="small"
                                disabled={!editEmail}
                                {...register("name")}
                            />
                        </FormControl>
                        <Button
                            variant={!editEmail ? 'contained' : "outlined"}
                            onClick={editEmailOnClick}
                            sx={{ m: 1 }}>
                            {!editEmail ? <EditIcon /> : <CancelIcon />}
                        </Button> */}
                        <InputEditPair
                            name="name"
                            label="İsim"
                            type="text"
                            errors={errors}
                            buttonLabel="İsim Değiştir"
                            register={register}
                            resetField={resetField}
                        />
                        {user?.isOAuth === false && (<>
                            <InputEditPair
                                name="email"
                                label="Email"
                                type="email"
                                errors={errors}
                                register={register}
                                buttonLabel="Emaili Değiştir"
                                resetField={resetField}
                            />
                            <OldAndNewPassword
                                required={false}
                                errors={errors}
                                register={register}
                                resetField={resetField}
                            />

                            {/* <PasswordsEditPair
                                required={false}
                                errors={errors}
                                register={register}
                                resetField={resetField}
                            /> */ }
                        </>)
                        }
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Button
                            type="submit"
                            form="my-form-id"
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
export default function UserSettings({ user }) {
    // const [state, formAction] = useFormState(authRegister, null);
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const { update } = useSession()
    console.log("User Settings")
    console.log(user)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        resetField,
        reset,
        watch,
        formState: { isValid, errors, isDirty, dirtyFields } } = useForm({
            mode: "all",
            defaultValues: {
                name: user?.name || undefined,
                email: user?.email || undefined,
                password: undefined,
                newpassword: undefined,
            },
            // resolver: joiResolver(loginValidation),
            resolver: joiResolver(settingValidation/* , { language: 'de' } */)
        })
     useEffect(() => {
        console.log("getting use effect")
      //  setValue("name",user.name)
      reset({
        name:user.name,
        email:user.email
      })
    }, [user]) 

    /* useMemo(() => {
            return {
                name: user?.name || undefined,
                email: user?.email || undefined,
                password: undefined,
                newpassword: undefined,
            }
        } */
    console.log("errors")
    console.log(errors)
    console.log("isDirty")
    console.log(isDirty)
    console.log("dirtyFields")
    console.log(dirtyFields)

    const getDirtyFields = (dirtyFields, formValues) => {
        let dirtyFieldsValues = {}
        if (!dirtyFields || !formValues || typeof dirtyFields !== 'object' || typeof formValues !== 'object') return null
        const dirtyArray = Object.keys(dirtyFields)
        for (let i = 0; i < dirtyArray.length; i++) {
            const dirty = dirtyArray[i] // name
            const dirtyValue = formValues[dirty]
            dirtyFieldsValues[dirty] = dirtyValue
        }
        console.log("dirtyFieldsValues")
        console.log(dirtyFieldsValues)
        return dirtyFieldsValues
    }
    const formRef = useRef(null);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
           <Button onClick={() => reset({name:"name"})}>Update</Button>
            <Box display="flex" alignItems="center" justifyContent="center" >
                {serverStatus &&
                    <Alert sx={{ mb: 1, width: "400px" }}
                        severity={
                            serverStatus.error ? "error"
                                : serverStatus.success ? "success"
                                    : "info"}>
                        Server Mesajı: {serverStatus?.message}</Alert>}
            </Box>
            <form
                ref={formRef}
                action={settings}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit((values) => {
                        getDirtyFields(dirtyFields, values)

                        try {
                            startTransition(() => {
                                settings(values).then((data) => {
                                    console.log("data recevied", data.message)
                                    setServerStatus(data)
                                    console.log(data)
                                    console.log("data.error")
                                    console.log(data.error)
                                    if (data.success) {
                                        update() // TO CHECK
                                    }
                                    reset()
                                }).catch((error) => {
                                    console.log("promise error")
                                    console.log(error)
                                    setServerStatus({ error: true, message: error })
                                })
                            })
                            console.log("success handle submit")
                        } catch (e) {
                            setIsLoading(true)
                            console.log("error handle submit")
                            setIsLoading(false)
                            // handle your error
                        }
                    })(evt);

                }}
                id="my-form-id"
                name='my-form-id'  >
                {/* Client Message: {errors && mapErrors(errors)} <br /> */}
                <FormContent
                    register={register}
                    isValid={isValid}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                    isPending={isPending}
                    isDirty={isDirty}
                    resetField={resetField}
                    user={user}
                />
            </form>
        </Box>
    )
}

