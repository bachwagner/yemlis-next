import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';

function InputEditPair({
    name,
    label,
    type,
    required,
    errors,
    buttonLabel,
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
            resetField(name)
        }
        setEdit(!edit)
    }
    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            {edit && (<FormControl >
                <TextField
                    name={name}
                    label={label}
                    type={type}
                    required={required}
                    InputLabelProps={{ shrink: true }}
                    fullWidth={fullWidth || true}
                    autoComplete={autoComplete || "off"}
                    autoFocus={autoFocus || true}
                    error={errors[name] ? true : false}
                    helperText={errors[name] && errors[name].message}
                    sx={{ width: width || "300px" }}
                    size={size || "small"}
                    disabled={!edit}
                    {...register(name)}
                />
            </FormControl>)
            }
            <Button
                variant={!edit ? 'contained' : "outlined"}
                onClick={editOnClick}
                sx={{ m: 1 }}>
                {!edit ? <>{buttonLabel} <EditIcon /></> : <CancelIcon />}
            </Button>
        </Box>
    )
}

export default InputEditPair