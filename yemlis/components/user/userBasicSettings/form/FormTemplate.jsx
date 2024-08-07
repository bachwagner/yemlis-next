'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react';
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import FormFrame from './FormFrame';
import FormContent from './FormContent';

function FormTemplate({
    user,
    formName,
    settingValidation,
    defaultValues,
    actionFunc,
    children
}) {
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const { update } = useSession()
    console.log("User Settings")
    console.log(user)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        resetField,
        reset,
        watch,
        formState: { isValid, errors, isDirty, dirtyFields } } = useForm({
            mode: "all",
            defaultValues: defaultValues,
            resolver: joiResolver(settingValidation/* , { language: 'de' } */)
        })

    useEffect(() => {
        console.log("getting use effect")
        //  setValue("name",user.name)
        reset({
            name: user.name,
            email: user.email
        })
    }, [user])

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
                        getDirtyFields(dirtyFields, values)

                        try {
                            startTransition(() => {
                                actionFunc(values).then((data) => {
                                    setServerStatus(data)

                                    if (data.success) {
                                        update() // TO CHECK
                                    }
                                    reset()
                                }).catch((error) => {
                                    console.log("promise error")
                                    console.log(error)
                                    setServerStatus({ error: true, message: error })
                                })
                            })
                        } catch (e) {
                            setIsLoading(true)
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
                    user={user}
                    isPending={isPending}
                    isDirty={isDirty}
                    errors={errors}
                    serverStatus={serverStatus}
                    register={register}
                    resetField={resetField}
                />
            </form>
        </>
    )
}

export default FormTemplate
