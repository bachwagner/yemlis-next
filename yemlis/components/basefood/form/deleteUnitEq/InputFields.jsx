import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

function UnitEqDeleteInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const unitEqs = props.unitEqs
    const errors = props.errors
    const register = props.register
    const control = props.control
    const getValues = props.getValues

    //const getNoParent = getValues("noParent")
    const allValues = getValues()
    console.log("All Values")
    console.log(allValues)

    return (
        <>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='uniteqselect'
                        size='small'
                        id="select-delete-unit"
                        options={unitEqs.map(ue => ue.name)}
                        sx={{ width: 300 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Unit Equivalent"
                                error={errors.name ? true : false}
                                helperText={errors.name && errors.name.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />

        </>
    )
}

export default UnitEqDeleteInputs