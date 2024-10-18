"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteUnitEqForm from "@/components/uniteqs/form/deleteUnitEq/DeleteUnitEqForm"

const DeleteUnitEqs = () => {
    const { user } = useCurrentUser()
    const [unitEqs, setUnitEqs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/unitequivalents`) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("unit eqs data")
                console.log(data)
                setUnitEqs([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("unit eqs data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🗑 Delete Unit Equivalent</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(unitEqs && !isLoading) && <DeleteUnitEqForm unitEqs={unitEqs} />}
        </Box >

    )
}

export default DeleteUnitEqs