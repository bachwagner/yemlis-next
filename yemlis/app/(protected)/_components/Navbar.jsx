"use client"
import { Box, Button } from "@mui/material"
import CustomLink from "@/components/inputs/CustomLink"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@/components/auth/UserButton"

export const Navbar = () => {
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
                Navbar Component
                <Box display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/server"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/server" ? "outlined" : "contained"}>
                        Server
                    </Button>
                    <Button
                        href="/client"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/client" ? "outlined" : "contained"}>
                        Client
                    </Button>
                    <Button
                        href="/admin"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/admin" ? "outlined" : "contained"}>
                        Admin
                    </Button>
                    <Button
                        href="/settings"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/settings" ? "outlined" : "contained"}>
                        Settings
                    </Button>
                    <UserButton/>
                </Box>
            </nav>
        </Box>
    )
}