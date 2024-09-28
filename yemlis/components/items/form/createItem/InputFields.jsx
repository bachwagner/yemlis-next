import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function ItemCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const itemTypes = props.itemTypes
    const control = props.control
    const getValues = props.getValues

    const allValues = getValues()
    console.log("XX items")
    console.log(itemTypes)
    const tagError =
        errors?.tags && typeof errors.tags === "array" && errors.tags.find(t => t.type !== undefined)

    return (
        <>
            <TextField
                name="name"
                label="Besin Öğesi Adı"
                type='text'
                required
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.name ? true : false}
                helperText={errors.name && errors.name.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("name")}
            />

            <Controller
                control={control}
                name="itemType"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='itemtypeselect'
                        size='small'
                        id="select-item-type"
                        options={itemTypes?.map(it => it.name)}
                        sx={{ width: 300 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Besin Öğesi Türü"
                                error={errors.itemtypeselect ? true : false}
                                helperText={errors.itemtypeselect && errors.itemtypeselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />
            <TextField
                name="usdaName"
                label="Usda İsmi"
                type='text'
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.usdaName ? true : false}
                helperText={errors.usdaName && errors.usdaName.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("usdaName")}
            />
            <TextField
                name="info"
                label="Bilgi"
                type='text'
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.info ? true : false}
                helperText={errors.info && errors.info.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("info")}
            />

        </>
    )
}

export default ItemCreateInputs