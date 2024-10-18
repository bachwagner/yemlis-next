import React from 'react'

import { Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

function UnitDeleteInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const units = props.units
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
                        name='unitselect'
                        size='small'
                        id="select-delete-unit"
                        options={units.map(fg => fg.name)}
                        sx={{ width: 300 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Unit"
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

export default UnitDeleteInputs