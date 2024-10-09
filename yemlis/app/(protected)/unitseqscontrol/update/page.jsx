"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import UpdateUnitForm from "@/components/units/form/updateUnit/UpdateUnitForm"

const UpdateUnit = () => {
    const { user } = useCurrentUser()
    const [units, setUnits] = useState([])
    const [unitEquivalents, setUnitEquivalents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        Promise.all([
            fetch('/api/units'),
            fetch('/api/unitequivalents')
        ])
            .then(([resUnits, resUnitEquivalents]) =>
                Promise.all([resUnits.json(), resUnitEquivalents.json()])
            )
            .then(([dataUnits, dataUnitEquivalents]) => {
                setUnits(dataUnits)
                setUnitEquivalents(dataUnitEquivalents)
                setIsLoading(false)
                console.log("units, unitEquivalents")
                console.log(dataUnits, dataUnitEquivalents)
            }).catch((err) => {
                console.log("units data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)

            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">

            <Typography variant="body1" fontSize={24}>🔧 Update Unit</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(units && unitEquivalents && !isLoading) && <UpdateUnitForm
                units={units}
                unitEquivalents={unitEquivalents}
            />}
        </Box >
    )
}

export default UpdateUnit