"use client"

import React from "react"
import { Box} from "@mui/material"

import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Error from "../food/error"


const UnitsEqsPage = () => {

    return (
        <ErrorBoundary fallback={<Error/>}>
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Besin Ekle Düzenle
        </Box >
        </ErrorBoundary>
    )
}

export default UnitsEqsPage