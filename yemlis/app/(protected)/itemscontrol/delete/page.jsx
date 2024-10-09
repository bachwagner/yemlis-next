"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteItemForm from "@/components/items/form/deleteItem/DeleteItemForm"

const DeleteFoodGroup = () => {
    const { user } = useCurrentUser()
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/items`, { next: { revalidate:100 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("items data")
                console.log(data)
                setItems([...data])
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
            <Typography variant="body1" fontSize={24}>🗑 Delete Nutrient</Typography>
            {isLoading && <div>Loading Nutrient...</div>}
            {isError && <div>Error</div>}
            {items && <DeleteItemForm items={items} />}
        </Box >
    )
}

export default DeleteFoodGroup