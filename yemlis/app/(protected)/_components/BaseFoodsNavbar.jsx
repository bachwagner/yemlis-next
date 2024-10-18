"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const BaseFoodsNavbar = () => {
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
                        href="/basefoods/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/basefoods/read" ? "outlined" : "contained"}>
                        Read
                    </Button>
                    <Button
                        href="/basefoods/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/basefoods/create" ? "outlined" : "contained"}>
                        Create
                    </Button>
                    <Button
                        href="/basefoods/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/basefoods/update" ? "outlined" : "contained"}>
                        Update
                    </Button>
                    <Button
                        href="/basefoods/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/basefoods/delete" ? "outlined" : "contained"}>
                        Delete
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}