import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';

function OldAndNewPassword({
    required,
    errors,
    register,
    resetField,
    fullWidth,
    autoComplete,
    autoFocus,
    width,
    size,

}) {
    const [edit, setEdit] = useState(false)
    const editOnClick = () => {
        if (edit) { //cancels and resets
            resetField("password")
            resetField("newpassword")
        }
        setEdit(!edit)
    }
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {edit && (<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <FormControl >
                    <TextField
                        name="password"
                        label="Eski Şifre"
                        type="password"
                        required={required}
                        InputLabelProps={{ shrink: true }}
                        fullWidth={fullWidth || true}
                        autoComplete={autoComplete || "off"}
                        autoFocus={autoFocus || true}
                        error={errors["password"] ? true : false}
                        helperText={errors["password"] && errors["password"].message}
                        sx={{ width: width || "300px", mb: 1, mt: 1 }}
                        size={size || "small"}
                        disabled={!edit}
                        {...register("password")}
                    />
                </FormControl>
                <FormControl >
                    <TextField
                        name="newpassword"
                        label="Yeni Şifre"
                        type="password"
                        required={required}
                        InputLabelProps={{ shrink: true }}
                        fullWidth={fullWidth || true}
                        autoComplete={autoComplete || "off"}
                        autoFocus={autoFocus || true}
                        error={errors["newpassword"] ? true : false}
                        helperText={errors["newpassword"] && errors["newpassword"].message}
                        sx={{ width: width || "300px" }}
                        size={size || "small"}
                        disabled={!edit}
                        {...register("newpassword")}
                    />
                </FormControl>
            </Box>)}
            <Button
                variant={!edit ? 'contained' : "outlined"}
                onClick={editOnClick}
                sx={{ m: 1 }}>
                {!edit ? <>Şifreyi Değiştir <EditIcon /></>  : <CancelIcon />}
            </Button>
        </Box>

    )
}

export default OldAndNewPassword