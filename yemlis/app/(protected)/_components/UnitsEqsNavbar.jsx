"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const UnitsEqsNavbar = () => {
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
                Units Equivalents
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/uniteqscontrol/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/uniteqscontrol/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/uniteqscontrol/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/uniteqscontrol/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/uniteqscontrol/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/uniteqscontrol/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/uniteqscontrol/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/uniteqscontrol/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}