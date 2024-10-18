"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const FoodsBandsNavbar = () => {
    const pathname = usePathname()
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                backgroundColor: "secondary.main",
                color: "text.primary"
            }}>
            <nav>
                Base Foods
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/foodbands/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodbands/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/foodbands/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodbands/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/foodbands/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodbands/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/foodbands/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodbands/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}