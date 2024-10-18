"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import CreateUnitEqForm from "@/components/uniteqs/form/createUnitEq/CreateUnitEqForm"

const CreateBaseFood = () => {
    const { user } = useCurrentUser()
    const [basefoods, setBasefoods] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/basefoods`)
            .then((res) => res.json())
            .then((data) => {
                console.log("BaseFoods data")
                console.log(data)
                setBasefoods([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("BaseFoods data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1" fontSize={24}>🔨 Create Base Food</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(basefoods && !isLoading) &&
                <CreateUnitEqForm
                    basefoods={basefoods}
                />}
        </Box >
    )
}

export default CreateBaseFood