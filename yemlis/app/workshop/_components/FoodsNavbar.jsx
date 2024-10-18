"use client"
import { Box, Button } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const FoodsNavbar = () => {
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
                
                <Box
                    display="inline-flex" alignItems="center" justifyContent="center">
                    <Button
                        href="/workshop/food/read"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/workshop/food/read" ? "outlined" : "contained"}>
                        Eklediğin Besinler
                    </Button>
                    <Button
                        href="/workshop/food/create"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/workshop/food/create" ? "outlined" : "contained"}>
                        Besin Ekle
                    </Button>
                    <Button
                        href="/workshop/food/update"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/workshop/food/update" ? "outlined" : "contained"}>
                        Eklediğin Besini Düzenle
                    </Button>
                    <Button
                        href="/workshop/food/delete"
                        LinkComponent={Link}
                        sx={{ m: 1 }}
                        variant={
                            pathname === "/workshop/food/delete" ? "outlined" : "contained"}>
                        Eklediğin Besini Sil
                    </Button>
                </Box>
            </nav>
        </Box>
    )
}