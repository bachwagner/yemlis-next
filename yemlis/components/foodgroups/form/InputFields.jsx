import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, TextField } from '@mui/material'

function FoodGroupCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const foodGroups = props.foodGroups

    return (
        <>
            <TextField
                name="foodGroupName"
                label="Besin Grubu Adı"
                type='text'
                required
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.foodGroupName ? true : false}
                helperText={errors.foodGroupName && errors.foodGroupName.message}
                sx={{ width: "400px", mt: 1, mb: 3 }}
                {...register("foodGroupName")}
            />
            <Autocomplete
                disablePortal
                size='small'
                id="select-food-group-parent"
                options={foodGroups.map(fg=>fg.name)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Form Grup Parenti" />}
            />

        </>
    )
}

export default FoodGroupCreateInputs