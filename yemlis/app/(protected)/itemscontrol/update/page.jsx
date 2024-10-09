"use client"

import React, { useState, useEffect, useTransition } from "react"
import { Box, LinearProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import UpdateItemForm from "@/components/items/form/updateItem/UpdateItemForm"

const UpdateItem = () => {
    const { user } = useCurrentUser()
    const [itemTypes, setItemTypes] = useState([])
    const [items, setItems] = useState([])
    const [units, setUnits] = useState([])
    const [unitEquivalents, setUnitEquivalents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        Promise.all([
            fetch('/api/items'),
            fetch('/api/itemtypes'),
            fetch('/api/units'),
            fetch('/api/unitequivalents'),
        ])
            .then(([resItems,resItemTypes, resUnits, resUnitEquivalents]) =>
                Promise.all([resItems.json(), resItemTypes.json(), resUnits.json(), resUnitEquivalents.json()])
            )
            .then(([dataItems, dataItemTypes, dataUnits, dataUnitEquivalents]) => {
                setItems(dataItems)
                setItemTypes(dataItemTypes)
                setUnits(dataUnits)
                setUnitEquivalents(dataUnitEquivalents)
                setIsLoading(false)
                console.log("items, itemTypes, units, unitEquivalents")
                console.log(dataItems, dataItemTypes, dataUnits, dataUnitEquivalents)
            }).catch((err) => {
                console.log("items data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)

            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🔧 Update Item</Typography>
            {isLoading &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress sx={{ height: 8 }} color="primary" />
                </Box>}
            {isError && <div>Error</div>}
            {(items && itemTypes && units && unitEquivalents && !isLoading) && <UpdateItemForm
                items={items}
                itemTypes={itemTypes}
                units={units}
                unitEquivalents={unitEquivalents}

            />}
        </Box >
    )
}

export default UpdateItem