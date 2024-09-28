"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import CreateItemForm from "@/components/items/form/createItem/CreateItemForm"

const CreateItem = () => {
    const { user } = useCurrentUser()
    const [itemTypes, setItemTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })  

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/itemtypes`, { next: { revalidate: 1200 } }) //TODO
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
            })
    }, [])

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🔨 Create Nutrient</Typography>
            {isLoading && <div>Loading Nutrient Types</div>}
            {isError && <div>Error</div>}
            {itemTypes && <CreateItemForm itemTypes={itemTypes} />}
        </Box >
    )
}

export default CreateItem