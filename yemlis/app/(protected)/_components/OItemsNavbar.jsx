"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const OItemsNavbar = () => {
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
                OItems
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/oitemscontrol/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/oitemscontrol/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/oitemscontrol/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/oitemscontrol/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/oitemscontrol/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/oitemscontrol/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/oitemscontrol/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/oitemscontrol/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}