"use server"

import { Box} from "@mui/material"

import { ErrorBoundary } from "next/dist/client/components/error-boundary"
import Error from "./error"


const WorkshopPage = () => {

    return (
        <ErrorBoundary fallback={<Error/>}>
        <Box boxShadow={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            Besin, yemek, menü, yemek listesi oluştur ve düzenle
        </Box >
        </ErrorBoundary>
    )
}

export default WorkshopPage