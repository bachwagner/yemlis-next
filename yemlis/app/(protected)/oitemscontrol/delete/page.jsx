"use client"

import React, {  useState, useEffect  } from "react"
import { Box, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteOItemForm from "@/components/oitems/form/deleteItem/DeleteOItemForm"

const DeleteOItem = () => {
    const { user } = useCurrentUser()
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/oitems`, { next: { revalidate:100 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("oitems data")
                console.log(data)
                setItems([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("oitems data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, []) 

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🗑 Delete Non-Nutrient Compounts</Typography>
            {isLoading && <div>Loading Non-Nutrient Compounts...</div>}
            {isError && <div>Error</div>}
            {items && <DeleteOItemForm items={items} />}
        </Box >
    )
}

export default DeleteOItem