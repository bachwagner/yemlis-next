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
                <Box display="inline-flex" alignItems="center" justifyContent="center">
                  {/*   <Button
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
                    </Button>*/}
                    <Button
                        href="/admin"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/admin" ? "outlined" : "contained"}>
                        Admin
                    </Button> 
                    <Button
                        href="/foodgroupscontrol"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/foodgroupscontrol" ? "outlined" : "contained"}>
                        Food Groups
                    </Button> 
                    <Button
                        href="/itemscontrol"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/itemscontrol" ? "outlined" : "contained"}>
                        Items
                    </Button> 
                    <Button
                        href="/oitemscontrol"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/oitemscontrol" ? "outlined" : "contained"}>
                       OItems
                    </Button> 
                    <Button
                        href="/unitscontrol"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/unitscontrol" ? "outlined" : "contained"}>
                        Units
                    </Button> 
                    <Button
                        href="/uniteqscontrol"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/uniteqscontrol" ? "outlined" : "contained"}>
                        Unit Equivalents
                    </Button> 
                    <Button
                        href="/basefoods"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/basefoods" ? "outlined" : "contained"}>
                        BaseFoods
                    </Button> 
                    <Button
                        href="/foodbands"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/foodbands" ? "outlined" : "contained"}>
                        FoodBands
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