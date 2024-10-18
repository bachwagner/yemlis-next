import React from 'react'

import InputEditPair from '@/components/user/userBasicSettings/InputPairs/TextInputEditPair'
import OldAndNewPassword from '@/components/user/userBasicSettings/InputPairs/OldAndNewPassword'
import { Autocomplete, Box, Checkbox, Chip, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { type } from 'os'

function OItemUpdateInputs(/* {
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
    const units = props.units
    const unitEquivalents = props.unitEquivalents
    const setValue = props.setValue
    const isPending = props.isPending
    const setError = props.setError
    const resetField = props.resetField
    const getOldName = watch("oldName")
    const getMainUnit = watch("mainUnit")
    //const allValues = getValues()
    const unitEQIDS = unitEquivalents.map((ue) => ue._id)


    const watchMeasureUnits = watch("measureUnits")
    const selectMeasureUnitsError =
        errors?.measureUnits && typeof errors.measureUnits === "array" && errors.measureUnits.find(t => t.type !== undefined)
    let relevantUnits = []
    if (watchMeasureUnits) {
        watchMeasureUnits.forEach(mu => { // weight vs
            const getUnits = units.filter(u => u.unitEquivalents.name === mu)
            relevantUnits = [...relevantUnits, ...getUnits]
        });
        console.log("modified wu")
        console.log(watchMeasureUnits)
        console.log("relevantUnits")
        console.log(relevantUnits)
    }


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
                    disabled={isPending}
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
                            setValue('measureUnits', getItemObj.standartMeasures.map((sm) => sm.name))
                            setValue('mainUnit', getItemObj.mainUnit?.name)
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
            {getOldName && (<><TextField
                name="name"
                label="Bileşen Adı"
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
                            sx={{ width: 300, mb: 2 }}
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

                <Controller
                    control={control}
                    name="measureUnits"
                    render={({ field: { onChange, value, ...props } }) => (
                        <Autocomplete
                            multiple
                            name='selectmeasureunits'
                            id="measure-units"
                            options={unitEquivalents ? unitEquivalents.map(u => u.name) : []}
                            sx={{ width: 300, mb: 1 }}
                            value={value || null}
                            onChange={(e, data) => {

                                const mainUnitsObj = units.find((u) => u.name === getMainUnit)
                                console.log("mainUnitsObj")
                                console.log(mainUnitsObj)
                                if (mainUnitsObj) {
                                    const mainUnitEQ = mainUnitsObj.unitEquivalents //weight
                                    console.log("mainUnitEQ")
                                    console.log(mainUnitEQ)

                                    const isUnitChild = data.includes(mainUnitEQ.name)
                                    console.log("isUnitChild")
                                    console.log(isUnitChild)
                                    if (!isFUnitChild) setValue("mainUnit", null, { shouldDirty: true })
                              
                                    }



                                onChange(data)

                            }}
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
                                    onChange={(e) => {
                                        console.log("e.target.value")
                                        console.log(e.target.value)

                                    }


                                    }
                                    sx={{ mb: 1 }}
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
                                    error={errors.mainUnit ? true : false}
                                    helperText={errors.mainUnit && errors.mainUnit.message} />}
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
            )}




        </>
    )
}

export default OItemUpdateInputs