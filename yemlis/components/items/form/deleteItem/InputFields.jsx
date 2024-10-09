import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function ItemDeleteInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const items = props.items
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
                        name='itemselect'
                        size='small'
                        id="select-delete-item"
                        options={items.map(fg => fg.name)}
                        sx={{ width: 300 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Besin Grubu"
                                error={errors.itemselect ? true : false}
                                helperText={errors.itemselect && errors.itemselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />

        </>
    )
}

export default ItemDeleteInputs