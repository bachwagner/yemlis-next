"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useCurrentUser } from "@/hooks/use-current-user"
import DeleteFoodGroupForm from "@/components/foodgroups/form/deleteFoodGroup/DeleteFoodGroupForm"

const DeleteFoodGroup = () => {
    const { user } = useCurrentUser()
    const [foodGroups, setFoodGroups] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    console.log("session user")
    console.log({ user })

    useEffect(() => {
        console.log("Use Effect")
        fetch(`/api/foodgroups`, { next: { revalidate:100 } }) //TODO
            .then((res) => res.json())
            .then((data) => {
                console.log("foodgroups data")
                console.log(data)
                setFoodGroups([...data])
                setIsLoading(false)
            }).catch((err) => {
                console.log("foodgroups data catch")
                console.log(err)
                setIsLoading(false)
                setIsError(true)
            })
    }, []) 

    return (
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
            <Typography variant="body1" fontSize={24}>🗑 Delete Food Group</Typography>
            {isLoading && <div>Loading Food Groups...</div>}
            {isError && <div>Error</div>}
            {foodGroups && <DeleteFoodGroupForm foodGroups={foodGroups} />}
        </Box >
    )
}

export default DeleteFoodGroup