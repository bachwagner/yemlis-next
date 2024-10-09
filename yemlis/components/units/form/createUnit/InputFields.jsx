import React from 'react'

import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function UnitCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const unitEqs = props.unitEqs
    const errors = props.errors
    const register = props.register
    const control = props.control
    const isPending = props.isPending
    const getValues = props.getValues
    const watch = props.watch

  //  const watchUnitEqs = watch("UnitEqs")
   
    return (
        <>
            <TextField
                name="name"
                label="Unit Adı"
                type='text'
                required
                size='small'
                disabled={isPending}
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                error={errors.name ? true : false}
                helperText={errors.name && errors.name.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("name")}
            />

            <Controller
                control={control}
                name="unitEqs"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='uniteqselect'
                        size='small'
                        id="select-uniteq"
                        disabled={isPending}
                        options={unitEqs?.map(ueq => ueq.name)}
                        sx={{ width: 300, mb: 1 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Unit Equivalent"
                                error={errors.uniteqselect ? true : false}
                                helperText={errors.uniteqselect && errors.uniteqselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />

         
            <TextField
                name="abbr"
                label="Unit Kısaltması"
                type='text'
                size='small'
                disabled={isPending}
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                error={errors.abbr ? true : false}
                helperText={errors.abbr && errors.abbr.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("abbr")}
            />
            <TextField
                name="info"
                label="Bilgi"
                multiline
                type='text'
                size='small'
                disabled={isPending}
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                error={errors.info ? true : false}
                helperText={errors.info && errors.info.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("info")}
            />

        </>
    )
}

export default UnitCreateInputs