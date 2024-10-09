"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import CreateUnitForm from "@/components/units/form/createUnit/CreateUnitForm"

const CreateUnit = () => {
    const { user } = useCurrentUser()
    const [unitEqs, setUnitEqs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/unitequivalents`, { next: { revalidate: 1200 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("unitEqs data")
                console.log(data)
                setUnitEqs([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("units data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🔨 Create Unit</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(unitEqs && !isLoading) &&
                <CreateUnitForm
                    unitEqs={unitEqs}
                />}
        </Box >
    )
}

export default CreateUnit