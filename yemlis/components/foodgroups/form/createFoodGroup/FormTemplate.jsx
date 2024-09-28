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
    foodGroups,
    formName,
    validation,
    defaultValues,
    actionFunc,
    children
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

  /*   useEffect(() => { //TO REMOVE? //TODO
        console.log("getting use effect")
        //  setValue("name",user.name)
        reset({
            name: foodGroup.name,
            foodId:foodGroup.foodId,
            parent: foodGroup.parent,
            text:foodGroup.text
            
        })
    }, [foodGroup]) */

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
                                        router.push('/foodgroupscontrol/read')
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
                    foodGroups={foodGroups}
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
