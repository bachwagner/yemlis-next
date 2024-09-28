"use client"

import React, { startTransition, Suspense, useState, useEffect, useTransition } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import { useSession, signOut, getSession } from "next-auth/react"

import { useCurrentUser } from "@/hooks/use-current-user"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Error from "./error"


const FoodGroupsPage = () => {
    const { user } = useCurrentUser()
    const [foodGroupData, setFoodGroupData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    return (
        <ErrorBoundary fallback={<Error/>}>
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Food group page
            {/* {status === "loading" ? <>Loading...</> : <> */}
            {/*{JSON.stringify(session)} */}
{/*             <Typography variant="body1" fontSize={24}>⚙ Food Groups</Typography>
            <Typography variant="body1" fontSize={20}>{foodGroupData?.name}</Typography>
            {isLoading ? <CircularProgress sx={{ mb: 1 }} color="primary" /> : <UserBasicSettings user={userData} />} */}
        </Box >
        </ErrorBoundary>
    )
}

export default FoodGroupsPage