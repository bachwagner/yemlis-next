"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import UpdateUnitEqsForm from "@/components/uniteqs/form/updateUnitEq/UpdateUnitEqsForm"

const UpdateUnitEqs = () => {
    const { user } = useCurrentUser()
    const [units, setUnits] = useState([])
    const [unitEqs, setUnitEqs] = useState([])
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
            .then(([dataUnits, dataUnitEqs]) => {
                setUnits(dataUnits)
                setUnitEqs(dataUnitEqs)
                setIsLoading(false)
                console.log("units, unitEquivalents")
                console.log(dataUnits, dataUnitEqs)
            }).catch((err) => {
                console.log("unit eqs update data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)

            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">

            <Typography variant="body1" fontSize={24}>🔧 Update Unit Equivalents</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(units && unitEqs && !isLoading) && <UpdateUnitEqsForm
                units={units}
                unitEqs={unitEqs}
            />}
        </Box >
    )
}

export default UpdateUnitEqs