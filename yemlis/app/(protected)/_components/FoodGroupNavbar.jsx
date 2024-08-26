"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const FoodGroupNavbar = () => {
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
                Food Groups
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/foodgroupscontrol/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodgroupscontrol/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/foodgroupscontrol/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodgroupscontrol/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/foodgroupscontrol/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodgroupscontrol/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/foodgroupscontrol/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/foodgroupscontrol/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}