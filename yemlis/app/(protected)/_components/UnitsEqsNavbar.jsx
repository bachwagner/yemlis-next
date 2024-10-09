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
                        href="/unitseqscontrol/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitseqscontrol/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/unitseqscontrol/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitseqscontrol/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/unitseqscontrol/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitseqscontrol/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/unitseqscontrol/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/unitseqscontrol/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}