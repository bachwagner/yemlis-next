'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react';
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import FormFrame from './FormFrame';
import FormContent from './FormContent';
import { useRouter } from 'next/navigation'

function FormTemplate({
    units,
    unitEquivalents,
    formName,
    validation,
    defaultValues,
    actionFunc
}) {
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const { update: updateSession } = useSession() // to check
    const router = useRouter()
    console.log("df values")
    console.log(defaultValues)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        resetField,
        reset,
        watch,
        getValues,
        setError,
        update,
        formState: { isValid, errors, isDirty, dirtyFields } } = useForm({
            mode: "all",
            defaultValues: defaultValues,
            resolver: joiResolver(validation/* , { language: 'de' } */)
        })

    console.log("raw dirty")
    console.log(dirtyFields)

    const getDirtyFields = (dirtyFields, formValues) => {
        let dirtyFieldsValues = {}
        if (!dirtyFields || !formValues || typeof dirtyFields !== 'object' || typeof formValues !== 'object') return null
        const dirtyArray = Object.keys(dirtyFields)
        for (let i = 0; i < dirtyArray.length; i++) {
            const dirty = dirtyArray[i] // name
            const dirtyValue = formValues[dirty]
            dirtyFieldsValues[dirty] = dirtyValue
        }
        console.log("dirtyFieldsValues")
        console.log(dirtyFieldsValues)
        return dirtyFieldsValues
    }

    const formRef = useRef(null)
    console.log("errors")
    console.log(errors)

    return (
        <>
            <form
                ref={formRef}
                action={actionFunc}
                onSubmit={(evt) => {
                    evt.preventDefault();
                    handleSubmit((values) => {
                        const dfvalues = getDirtyFields(dirtyFields, values)
                        console.log("dfvalues")
                        console.log(dfvalues)
                        try {
                            startTransition(() => {
                                actionFunc(dfvalues).then((data) => {
                                    setServerStatus(data)
                                    if (data.success) {
                                        updateSession() // TO CHECK
                                        reset()
                                        router.push('/unitscontrol/read')
                                    }
                                    reset()
                                }).catch((error) => {
                                    console.log("promise error")
                                    console.log(error)
                                    setServerStatus({ error: true, message: error })
                                })
                            })
                        } catch (e) {
                            console.log("error handle submit")
                            setIsLoading(false)
                            // handle your error
                        }
                    })(evt)
                }}
                id={formName}
                name={formName}>
                <FormContent
                    formName={formName}
                    units={units}
                    unitEquivalents={unitEquivalents}
                    isPending={isPending}
                    isDirty={isDirty}
                    errors={errors}
                    serverStatus={serverStatus}
                    register={register}
                    resetField={resetField}
                    control={control}
                    getValues={getValues}
                    watch={watch}
                    reset={reset}
                    setValue={setValue}
                    setError={setError}

                />
            </form>
        </>
    )
}

export default FormTemplate
