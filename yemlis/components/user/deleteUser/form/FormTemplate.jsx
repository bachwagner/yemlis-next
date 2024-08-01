'use client'
import React, { useState, useTransition, useEffect, useRef, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { joiResolver } from "@hookform/resolvers/joi"
import { useForm } from 'react-hook-form'
import FormContent from './FormContent'

function FormTemplate({
    user,
    formName,
    deleteAccountValidation,
    defaultValues,
    actionFunc
}) {
    const [isPending, startTransition] = useTransition()
    const [serverStatus, setServerStatus] = useState(false)
    const { update } = useSession()
    console.log("User Delete")
    console.log(user)
    const isMarkedToDelete = user.isMarkedToDelete
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
            resolver: joiResolver(deleteAccountValidation/* , { language: 'de' } */)
        })

   /*  useEffect(() => {   // TO CHECK
        console.log("getting use effect")
        //  setValue("name",user.name)
        reset({
            name: user.name,
            email: user.email
        })
    }, [user]) */

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
                        console.log("delete account submitting")
                        console.log(values)
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
                    serverStatus={serverStatus}
                    register={register}
                    isMarkedToDelete={isMarkedToDelete}
                />
            </form>
        </>
    )
}

export default FormTemplate
