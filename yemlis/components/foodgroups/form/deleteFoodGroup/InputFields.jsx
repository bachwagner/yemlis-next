import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function FoodGroupDeleteInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const foodGroups = props.foodGroups
    const control = props.control
    const getValues = props.getValues

    //const getNoParent = getValues("noParent")
    const allValues = getValues()
    console.log("All Values")
    console.log(allValues)
    const tagError =
        errors?.tags && typeof errors.tags === "array" && errors.tags.find(t => t.type !== undefined)

    return (
        <>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='foodgroupselect'
                        size='small'
                        id="select-delete-food-group"
                        options={foodGroups.map(fg => fg.name)}
                        sx={{ width: 300 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Besin Grubu"
                                error={errors.foodgroupselect ? true : false}
                                helperText={errors.foodgroupselect && errors.foodgroupselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />

        </>
    )
}

export default FoodGroupDeleteInputs