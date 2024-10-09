import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

function ItemCreateInputs(/* {
    user,
    errors,
    register,
    resetField
} */props) {
    const errors = props.errors
    const register = props.register
    const itemTypes = props.itemTypes
    const control = props.control
    const isPending = props.isPending
    const getValues = props.getValues
    const watch = props.watch
    const units = props.units
    const unitEquivalents = props.unitEquivalents
   
    const watchMeasureUnits = watch("measureUnits")
    const selectMeasureUnitsError =
        errors?.measureUnits && typeof errors.measureUnits === "array" && errors.measureUnits.find(t => t.type !== undefined)
    let relevantUnits = []
    if(watchMeasureUnits){
        watchMeasureUnits.forEach(mu => { // weight vs
            const getUnits = units.filter(u=>u.unitEquivalents.name===mu)
            relevantUnits=[...relevantUnits,...getUnits]
        });
        console.log("modified wu")
        console.log(watchMeasureUnits)
        console.log("relevantUnits")
        console.log(relevantUnits)
    }
    return (
        <>
            <TextField
                name="name"
                label="Besin Öğesi Adı"
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
                name="itemType"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='itemtypeselect'
                        size='small'
                        id="select-item-type"
                        disabled={isPending}
                        options={itemTypes?.map(it => it.name)}
                        sx={{ width: 300, mb: 1 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Besin Öğesi Türü"
                                error={errors.itemtypeselect ? true : false}
                                helperText={errors.itemtypeselect && errors.itemtypeselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />
            <Controller
                control={control}
                name="measureUnits"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        multiple
                        name='selectmeasureunits'
                        id="measure-units"
                        options={unitEquivalents? unitEquivalents.map(u => u.name) : []}
                        sx={{ width: 300, mb: 1 }}
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
                                label="Ölçüm Türleri"
                                placeholder="Ölçüm Birimi ekle (en az 1)"
                                size='small'
                                error={errors.tags ? true : false}
                                helperText={
                                    errors && selectMeasureUnitsError ? selectMeasureUnitsError.message :
                                        errors.selectmeasureunits ? errors.selectmeasureunits.message : undefined}
                            />
                        )}
                    />
                )}
            />

            <Controller
                control={control}
                name="mainUnit"
                render={({ field: { onChange, value, ...props } }) => (
                    <Autocomplete
                        disablePortal
                        name='mainunitselect'
                        size='small'
                        id="select-item-type"
                        disabled={isPending || watchMeasureUnits?.length < 1}
                        options={relevantUnits ? relevantUnits.map(u => u.name) : []}
                        sx={{ width: 300, mb: 1 }}
                        value={value || null}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Ana Ölçüm Birimi"
                                error={errors.mainunitselect ? true : false}
                                helperText={errors.mainunitselect && errors.mainunitselect.message} />}
                        onChange={(e, data) => { onChange(data) }}
                        {...props}

                    />
                )}
            />
            <TextField
                name="usdaName"
                label="Usda İsmi"
                type='text'
                size='small'
                disabled={isPending}
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
                disabled={isPending}
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

export default ItemCreateInputs