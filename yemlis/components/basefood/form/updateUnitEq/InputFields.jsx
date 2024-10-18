import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

function UnitEqsUpdateInputs
    (/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const units = props.units
    const unitEqs = props.unitEqs
    const errors = props.errors
    const register = props.register
    const control = props.control
    const getValues = props.getValues
    const watch = props.watch
    const reset = props.reset
    const setValue = props.setValue
    const isPending = props.isPending
    const setError = props.setError
    const resetField = props.resetField
    const getOldName = watch("oldName")
    //const allValues = getValues()


    return (
        <> <Controller
            control={control}
            name="oldName"
            render={({ field: { onChange, value, ...props } }) => (
                <Autocomplete
                    disablePortal
                    name='oldNameSelect'
                    size='small'
                    id="select-uniteq"
                    options={unitEqs?.map(it => it.name)}
                    sx={{ width: 300 }}
                    disabled={isPending}
                    value={value || null}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Unit Equivalents"
                            error={errors.oldNameSelect ? true : false}
                            helperText={errors.oldNameSelect && errors.oldNameSelect.message} />}
                    onChange={(e, data) => {
                        const getUnitEqObj = unitEqs?.find(unitEq => unitEq?.name === data)
                        console.log("resett")
                        console.log(data)
                        console.log("getUnitEqObj")
                        console.log(getUnitEqObj)
                        onChange(data)
                        if (getUnitEqObj) {
                            setValue('name', data)
                            setValue('oldName', data)
                            //  setValue('oldName', data,{shouldDirty:true}) // //
                            setValue('info', getUnitEqObj.info)
                            setValue('mainUnit', getUnitEqObj.mainUnit?.name)
                           
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
                label="Yeni Unit Eq Adı"
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
                            name='mainUnitSelect'
                            size='small'
                            id="select-mainunit"
                            disabled={isPending}
                            options={units?.map(it => it.name)}
                            sx={{ width: 300, mb: 2 }}
                            value={value || null}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Main Unit"
                                    error={errors.mainUnit ? true : false}
                                    helperText={errors.mainUnit && errors.mainUnit.message} />}
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
           
            </>
            )}




        </>
    )
}

export default UnitEqsUpdateInputs
