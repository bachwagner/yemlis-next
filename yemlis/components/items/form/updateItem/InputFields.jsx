import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function ItemUpdateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const items = props.items
    const itemTypes = props.itemTypes
    const control = props.control
    const getValues = props.getValues
    const watch = props.watch
    const reset = props.reset
    const setValue = props.setValue
    //  const getFoodGroup = watch("foodGroup")
    const allValues = getValues()
    console.log("All Values")
    console.log(allValues)

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
                    id="select-item"
                    options={items?.map(it => it.name)}
                    sx={{ width: 300 }}
                    value={value || null}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Besin Öğesi"
                            error={errors.oldNameSelect ? true : false}
                            helperText={errors.oldNameSelect && errors.oldNameSelect.message} />}
                    onChange={(e, data) => {
                        const getItemObj = items?.find(item => item?.name === data)
                        console.log("resett")
                        console.log(data)
                        console.log("getItemObj")
                        console.log(getItemObj)
                        onChange(data)
                        if (getItemObj) {
                            setValue('name', data)
                            setValue('oldName', data)
                          //  setValue('oldName', data,{shouldDirty:true}) // //
                            setValue('formula', getItemObj.formula)
                            setValue('usdaName', getItemObj.usdaName)
                            setValue('info', getItemObj.info)
                            setValue('itemType', getItemObj.itemType?.name)
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
            <TextField
                name="name"
                label="Besin Öğesi Adı"
                type='text'
                required
                size='small'
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
                        onChange={(e, data) => {
                            onChange(data)

                        }
                        }

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
                error={errors.usdaName ? true : false}
                helperText={errors.usdaName && errors.usdaName.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("usdaName")}
            />
            <TextField
                name="formula"
                label="Formül"
                type='text'
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                error={errors.formula ? true : false}
                helperText={errors.formula && errors.formula.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("formula")}
            />
            <TextField
                name="info"
                label="Bilgi"
                type='text'
                size='small'
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

export default ItemUpdateInputs