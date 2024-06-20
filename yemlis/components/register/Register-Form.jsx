'use client'
import React, { useState, useEffect, useRef } from 'react'
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
import FormControl from '@mui/material/FormControl';
import GoogleIcon from '@mui/icons-material/Google';
import { useFormState, useFormStatus } from 'react-dom'
import CustomLink from '../inputs/CustomLink';
import { authRegister } from '@/app/lib/actions';
import { register as registerValidation } from '../../app/lib/validationSchemas'
import { Link } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

export function FormContent({ register, isValid, control, setValue, errors }) {
    const { pending } = useFormStatus()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleTerms = () => {
        setOpen(false)
        setValue('acceptterms', true)
    }
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    return (
        <>
            <Grid container spacing={2}>
                {/* <ErrorMessage /> */}
                <Grid item xs={12} textAlign="center">
                    {/* {state && state?.message} */}
                    {pending && "Gönderiliyor.."}
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
                <Grid item xs={12} >
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <TextField
                            name="repeatpassword"
                            label="Şifre Tekrar"
                            type="password"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            autoComplete='current-password'
                            error={errors.repeatpassword ? true : false}
                            helperText={errors.repeatpassword && errors.repeatpassword.message}
                            sx={{ width: "400px" }}
                            {...register("repeatpassword")}
                        />
                    </Box>
                </Grid>

                <Grid xs={12} >
                    <Box display="flex" alignItems="center" justifyContent="center" >
                        <FormControl
                            required
                            error={errors.acceptterms}
                            component="fieldset"
                            variant="standard"
                            sx={{ alignItems: "center" }}
                        >
                            <FormControlLabel
                                control={<Controller
                                    name="acceptterms"
                                    control={control}
                                    render={({ field: props }) => (
                                        <CheckBox
                                            {...props}
                                            checked={props.value}
                                            onChange={(e) => props.onChange(e.target.checked)}
                                        />
                                    )}
                                />}
                                label={<p><Link onClick={(e) => {
                                    e.preventDefault()
                                    handleOpen()
                                }}>Kullanım Şartlarını</Link> Kabul Ediyorum</p>}
                            />
                            {
                                errors.acceptterms &&
                                <FormHelperText>Kayıt Olmak İçin Kullanım Şartları Kabul Edilmeli</FormHelperText>}
                        </FormControl>
                    </Box>
                </Grid>
                <Grid xs={12} p={0}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <FormControl
                            required
                            error={errors.acceptmails}
                            component="fieldset"
                            variant="standard"
                            sx={{ alignItems: "center" }}>

                            <FormControlLabel
                                control={<Controller
                                    name="acceptmails"
                                    control={control}
                                    //  rules={{ required: true }}
                                    render={({ field:props }) => (
                                        <CheckBox
                                        {...props}
                                        checked={props.value}
                                        onChange={(e) => props.onChange(e.target.checked)}
                                        />
                                    )}
                                />}
                                label="Beni gelişmelerden emaille bilgilendir"
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
                        sx={{ mt: 3, mb: 1, width: "400px" }}>
                        Kayıt Ol
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
                        onClick={() => console.log("Google Register")}>
                        <GoogleIcon /> &nbsp;  Google ile Kayıt Ol
                    </Button>
                </Box >
            </Grid>
            <Grid item xs={12} >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box display="block" textAlign="right" width="400px">
                        <CustomLink target="/" label="Anasayfa" />
                        <br />
                        <CustomLink target="/login" label="Zaten Hesabın Var mı? Giriş Yap" />
                        <br />
                    </Box >
                </Box >
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description" >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Kullanım Koşulları
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Button onClick={handleTerms}>Okudum ve Kabul Ediyorum</Button>
                </Box>
            </Modal>

        </>
    )
}
export default function RegisterForm() {
    const [state, formAction] = useFormState(authRegister, null);
    const { register, control, handleSubmit, setValue, formState: { isValid, errors } } = useForm({
        mode: "all",
        defaultValues: { acceptmails: true, acceptterms: false },
        // resolver: joiResolver(loginValidation),
        resolver: joiResolver(registerValidation/* , { language: 'de' } */)
    })
    console.log("errors")
    console.log(errors)
    const formRef = useRef(null);

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
            <Box display="flex" alignItems="center" justifyContent="center" >
                {/*                 {(state && state?.status === "error") && <Alert sx={{ mb: 1, width: "400px" }} severity="error"> Server  Message: {state?.message}</Alert>}
 */}            </Box>
            <form
                ref={formRef}
                action={formAction}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit(() => {
                        formAction(new FormData(formRef.current));
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
                />
            </form>
        </Box>

    )
}

