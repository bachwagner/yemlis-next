"use client"

import React from "react"
import { Box } from "@mui/material"
import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Error from "./error"

const FoodGroupsPage = () => {
    return (
        <ErrorBoundary fallback={<Error />}>
            <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                Items Control Page
            </Box >
        </ErrorBoundary>
    )
}

export default FoodGroupsPage