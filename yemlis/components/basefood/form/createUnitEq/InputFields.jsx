import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

function UnitEqCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const units = props.units
    const errors = props.errors
    const register = props.register
    const control = props.control
    const isPending = props.isPending
    const getValues = props.getValues
    const watch = props.watch

  //  const watchUnitEqs = watch("unitEqs")
  
    console.log("unit eqs units")
    console.log(units)
    return (
        <>
            <TextField
                name="name"
                label="Unit Equivalent Adı"
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
                name="mainUnit"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='mainunitselect'
                        size='small'
                        id="select-uniteq"
                        disabled={isPending}
                        options={units?.map(u => u.name)}
                        sx={{ width: 300, mb: 1 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Main Unit"
                                error={errors.mainunitselect ? true : false}
                                helperText={errors.mainunitselect && errors.mainunitselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
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

export default UnitEqCreateInputs