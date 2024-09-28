"use client"

import React, { useState, useEffect, useTransition } from "react"
import { Box, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import UpdateItemForm from "@/components/items/form/updateItem/UpdateItemForm"

const UpdateItem = () => {
    const { user } = useCurrentUser()
    const [itemTypes, setItemTypes] = useState([])
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/itemtypes`, { next: { revalidate: 1200 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("items types data")
                console.log(data)
                setItemTypes([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("items types data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
        fetch(`/api/items`, { next: { revalidate: 1200 } }) //TODO
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
            <Typography variant="body1" fontSize={24}>🔧 Update Item</Typography>
            {isLoading && <div>Loading Item Types Groups...</div>}
            {isError && <div>Error</div>}
            {itemTypes &&
                <UpdateItemForm
                    itemTypes={itemTypes}
                    items={items}
                />}
        </Box >
    )
}

export default UpdateItem