import React from 'react'

import { Autocomplete, TextField, Typography } from '@mui/material'
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

    const watchUnitEqs = watch("unitEqs")
    console.log("unitEqss")
    console.log(unitEqs)
    console.log("watchUnitEqs")
    console.log(watchUnitEqs)
    let selectedUnitEqObj
    if(watchUnitEqs){
        selectedUnitEqObj = unitEqs?.find((ue) => ue.name === watchUnitEqs)
    console.log("query result")
    console.log(selectedUnitEqObj)
    }
    console.log("selectedUnitEqObj")
    console.log(selectedUnitEqObj)
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
                                error={errors.unitEqs ? true : false}
                                helperText={errors.unitEqs && errors.unitEqs.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />
            <Typography>Unit Equivalent Ana Birimi: {selectedUnitEqObj && selectedUnitEqObj.mainUnit?.name}</Typography>

            <TextField
                name="equals"
                label="Unit Oranı"
                type='number'
                size='small'
                disabled={isPending}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{
                    step:0.000000001
                }}
                autoComplete="off"
                error={errors.equals ? true : false}
                helperText={errors.equals && errors.equals.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("equals")}
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