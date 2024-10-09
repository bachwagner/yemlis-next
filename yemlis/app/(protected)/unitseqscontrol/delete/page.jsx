"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteUnitForm from "@/components/units/form/deleteUnit/DeleteUnitForm"

const DeleteFoodGroup = () => {
    const { user } = useCurrentUser()
    const [units, setUnits] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/units`, { next: { revalidate: 100 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("units data")
                console.log(data)
                setUnits([...data])
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
            <Typography variant="body1" fontSize={24}>🗑 Delete Unit</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(units && !isLoading) && <DeleteUnitForm units={units} />}
        </Box >

    )
}

export default DeleteFoodGroup