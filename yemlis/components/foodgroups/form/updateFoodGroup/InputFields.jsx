import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function FoodGroupCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const foodGroups = props.foodGroups
    const control = props.control
    const getValues = props.getValues
    const watch = props.watch
    const reset = props.reset
    const setValue = props.setValue
    const getNoParent = getValues("noParent")
    const getOldName = watch("oldName")
    const allValues = getValues()
    console.log("All Values")
    console.log(allValues)
    console.log("getNoParent")
    console.log(getNoParent)
    const tagError =
        errors?.tags && typeof errors.tags === "array" && errors.tags.find(t => t.type !== undefined)

    return (
        <>
            <Controller
                control={control}
                name="oldName"
                render={({ field: { onChange, value, ...props } }) => (
                    <>
                        <Autocomplete
                            disablePortal
                            name='oldNameSelect'
                            size='small'
                            id="select-food-group"
                            options={foodGroups ? foodGroups.map(fg => fg.name) : []}
                            freeSolo
                            sx={{ width: 300, mb:1 }}
                            value={value || null}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Besin Grubu"
                                    size='small'
                                    error={errors.oldNameSelect ? true : false}
                                    helperText={errors.oldNameSelect && errors.oldNameSelect.message}
                                />
                            )}
                            onChange={(e, data) => {
                                const getFoodGroupObj = foodGroups?.find(fg => fg?.name === data)
                                console.log("resett")
                                console.log(data)
                                console.log("getFoodGroupObj")
                                console.log(getFoodGroupObj)
                                onChange(data)
                                if (getFoodGroupObj) {
                                    setValue('oldName', data)
                                    setValue('name', data)
                                    setValue('parent', getFoodGroupObj.parent?.name || null)
                                    setValue('tags', getFoodGroupObj.tags)
                                    setValue('noParent', getFoodGroupObj.parent ? false : true)
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

                    </>
                )}
            />

        {getOldName && (<>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value, ...props } }) => (
                    <>
                        <TextField
                            name="changename"
                            label="Yeni Besin Grubu Adı"
                            type='text'
                            required
                            size='small'
                            sx={{ width: 300 }}
                            value={value || ""}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            autoComplete="off"
                            error={errors.changename ? true : false}
                            helperText={errors.changename && errors.changename.message}
                            onChange={(e)=>{
                                onChange(e.target.value)
                            }}
                        />

                    </>
                )}
            />
            <>

                <FormControlLabel
                    control={
                        <Controller
                            name="noParent"
                            control={control}
                            sx={{ m: 0, p: 0 }}
                            render={({ field: props }) => (
                                <Checkbox
                                    {...props}
                                    checked={props.value}
                                    onChange={(e) => props.onChange(e.target.checked)}
                                />
                            )
                            }
                        />
                    }
                    label="Parenti Yok"
                />
                {errors?.noParent && <Box><Typography variant="caption" color="error">Bu Alan İşaretlenmeli</Typography></Box>}

                {!getNoParent && <Controller
                    control={control}
                    name="parent"
                    render={({ field: { onChange, value, ...props } }) => (
                        <Autocomplete
                            disablePortal
                            name='parentselect'
                            size='small'
                            id="select-food-group-parent"
                            options={foodGroups.map(fg => fg.name)}
                            sx={{ width: 300, mb: 1 }}
                            value={value || null}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Form Grup Parenti"
                                    error={errors.parentselect ? true : false}
                                    helperText={errors.parentselect && errors.parentselect.message} />}

                            onChange={(e, data) => { onChange(data) }}
                            {...props}

                        />
                    )}
                />
                }

                <Controller
                    control={control}
                    name="tags"
                    render={({ field: { onChange, value, ...props } }) => (
                        <Autocomplete
                            multiple
                            id="foodgroups-tags"
                            options={["katkı maddeler", "süt", "fruktoz"]}
                            freeSolo
                            sx={{ width: 300 }}
                            value={value || null}
                            onChange={(e, data) => { onChange(data) }}
                            {...props}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    const { key, ...tagProps } = getTagProps({ index });
                                    return (
                                        <Chip variant="outlined" label={option} key={key} {...tagProps} />
                                    );
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Etiketler"
                                    placeholder="Etiket Ekle (en az 2 en fazla 6)"
                                    size='small'
                                    error={errors.tags ? true : false}
                                    helperText={
                                        errors && tagError ? tagError.message :
                                            errors.tags ? errors.tags.message : undefined}
                                />
                            )}
                        />
                    )}
                />

            </>
        </>)}

        </>
    )
}

export default FoodGroupCreateInputs