"use client"

import React, { useState, useEffect } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import CreateOItemForm from "@/components/oitems/form/createOItem/CreateOItemForm"

const CreateOItem = () => {
    const { user } = useCurrentUser()
    const [itemTypes, setItemTypes] = useState([])
    const [units, setUnits] = useState([])
    const [unitEquivalents, setUnitEquivalents] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        Promise.all([
            fetch('/api/itemtypes'),
            fetch('/api/units'),
            fetch('/api/unitequivalents'),
        ])
            .then(([resItemTypes, resUnits, resUnitEquivalents]) =>
                Promise.all([resItemTypes.json(), resUnits.json(), resUnitEquivalents.json()])
            )
            .then(([dataItemTypes, dataUnits, dataUnitEquivalents]) => {
                setItemTypes(dataItemTypes)
                setUnits(dataUnits)
                setUnitEquivalents(dataUnitEquivalents)
                setIsLoading(false)
                console.log("itemTypes, units, unitEquivalents")
                console.log(dataItemTypes, dataUnits, dataUnitEquivalents)
            }).catch((err) => {
                console.log("items data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)

            })

        /*  fetch(`/api/itemtypes`, { next: { revalidate: 1200 } }) //TODO
             .then((res) => res.json())
             .then((data) => {
                 console.log("items data")
                 console.log(data)
                 setItemTypes([...data])
                 setIsLoading(false)
             }).catch((err) => {
                 console.log("items data catch")
                 console.log(err)
                 setIsLoading(false)
                 setIsError(true)
             }) */



    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography variant="body1" fontSize={24}>🔨 Create Non-Nutrient Component</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(itemTypes && units && unitEquivalents && !isLoading) && <CreateOItemForm
                itemTypes={itemTypes}
                units={units}
                unitEquivalents={unitEquivalents}

            />}
        </Box >
    )
}

export default CreateOItem