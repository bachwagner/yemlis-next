'use client'
import React, { useState, useTransition, useRef } from 'react'
import { useSession } from 'next-auth/react';
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from 'react-hook-form';
import FormContent from './FormContent';
import { useRouter } from 'next/navigation'

function FormTemplate({
    unitEqs,
    formName,
    validation,
    defaultValues,
    actionFunc
}) {
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const { update } = useSession()
    const router = useRouter()

    const {
        register,
        control,
        handleSubmit,
        setValue,
        resetField,
        reset,
        watch,
        getValues,
        formState: { isValid, errors, isDirty, dirtyFields } } = useForm({
            mode: "all",
            defaultValues: defaultValues,
            resolver: joiResolver(validation/* , { language: 'de' } */)
        })

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
                                        router.push('/uniteqscontrol/read')
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
                    unitEqs={unitEqs}
                    formName={formName}
                    isPending={isPending}
                    isDirty={isDirty}
                    errors={errors}
                    serverStatus={serverStatus}
                    register={register}
                    resetField={resetField}
                    control={control}
                    getValues={getValues}
                />
            </form>
        </>
    )
}

export default FormTemplate
