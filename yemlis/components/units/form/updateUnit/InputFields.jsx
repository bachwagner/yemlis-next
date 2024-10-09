import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { type } from 'os'

function UnitUpdateInputs
(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const control = props.control
    const getValues = props.getValues
    const watch = props.watch
    const reset = props.reset
    const units = props.units
    const unitEquivalents = props.unitEquivalents
    const setValue = props.setValue
    const isPending = props.isPending
    const setError = props.setError
    const resetField = props.resetField
    const getOldName = watch("oldName")
    //const allValues = getValues()

    const tagError =
        errors?.tags && typeof errors.tags === "array" && errors.tags.find(t => t.type !== undefined)

    return (
        <> <Controller
            control={control}
            name="oldName"
            render={({ field: { onChange, value, ...props } }) => (
                <Autocomplete
                    disablePortal
                    name='oldNameSelect'
                    size='small'
                    id="select-unit"
                    options={units?.map(it => it.name)}
                    sx={{ width: 300 }}
                    disabled={isPending}
                    value={value || null}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Unit"
                            error={errors.oldNameSelect ? true : false}
                            helperText={errors.oldNameSelect && errors.oldNameSelect.message} />}
                    onChange={(e, data) => {
                        const getUnitObj = units?.find(unit => unit?.name === data)
                        console.log("resett")
                        console.log(data)
                        console.log("getUnitObj")
                        console.log(getUnitObj)
                        onChange(data)
                        if (getUnitObj) {
                            setValue('name', data)
                            setValue('oldName', data)
                            //  setValue('oldName', data,{shouldDirty:true}) // //
                            setValue('abbr', getUnitObj.abbr)
                            setValue('info', getUnitObj.info)
                            setValue('unitEqs', getUnitObj.unitEquivalents.name)
                            /*  reset({
                                 oldName: data,
                                 name: getFoodGroupObj.name,
                                 parent: getFoodGroupObj.parent?.name || null,
                                 tags: getFoodGroupObj.tags,
                                 noParent: getFoodGroupObj.parent ? false : true
                             }) */
                        }

                    }
                    }

                    {...props}

                />
            )}
        />
            {getOldName && (<><TextField
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
                            name='unitEqsSelect'
                            size='small'
                            id="select-unit-type"
                            disabled={isPending}
                            options={unitEquivalents?.map(it => it.name)}
                            sx={{ width: 300, mb: 2 }}
                            value={value || null}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Unit Equivalent"
                                    error={errors.unitEqsSelect ? true : false}
                                    helperText={errors.unitEqsSelect && errors.unitEqsSelect.message} />}
                            onChange={(e, data) => {
                                onChange(data)

                            }
                            }

                            {...props}

                        />
                    )}
                />
    
                <TextField
                    name="info"
                    label="Bilgi"
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
                <TextField
                    name="abbr"
                    label="Kısaltma"
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
               </>
            )}




        </>
    )
}

export default UnitUpdateInputs
