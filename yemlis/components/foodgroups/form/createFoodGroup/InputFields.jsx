import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function FoodGroupUpdateInputs(/* {
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

    const getNoParent = getValues("noParent")
    const allValues = getValues()
    console.log("All Values")
    console.log(allValues)
    const tagError =
        errors?.tags && typeof errors.tags === "array" && errors.tags.find(t => t.type !== undefined)

    return (
        <>
            <TextField
                name="name"
                label="Besin Grubu Adı"
                type='text'
                required
                size='small'
                InputLabelProps={{ shrink: true }}
                fullWidth
                autoComplete="off"
                autoFocus
                error={errors.foodGroupName ? true : false}
                helperText={errors.foodGroupName && errors.foodGroupName.message}
                sx={{ width: "400px", mt: 1, mb: 1 }}
                {...register("name")}
            />


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
                        sx={{ width: 300 }}
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
                        sx={{ width: 300, mb:1 }}
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
    )
}

export default FoodGroupUpdateInputs