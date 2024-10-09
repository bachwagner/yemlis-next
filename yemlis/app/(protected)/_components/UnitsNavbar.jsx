"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const UnitsNavbar = () => {
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
                Units
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/unitscontrol/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitscontrol/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/unitscontrol/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitscontrol/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/unitscontrol/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitscontrol/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/unitscontrol/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitscontrol/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}