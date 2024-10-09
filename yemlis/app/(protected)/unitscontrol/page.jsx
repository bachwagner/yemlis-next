"use client"

import React from "react"
import { Box} from "@mui/material"

import { useCurrentUser } from "@/hooks/use-current-user"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Error from "./error"


const FoodGroupsPage = () => {
/*     const { user } = useCurrentUser()
    const [foodGroupData, setFoodGroupData] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false) */
    return (
        <ErrorBoundary fallback={<Error/>}>
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Units page
        </Box >
        </ErrorBoundary>
    )
}

export default FoodGroupsPage