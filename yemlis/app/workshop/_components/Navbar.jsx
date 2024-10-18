"use client"
import { Box, Button } from "@mui/material"
import CustomLink from "@/components/inputs/CustomLink"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import ArticleIcon from '@mui/icons-material/Article';
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
                    <Button
                        href="/workshop/food"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/workshop/food" ? "outlined" : "contained"}>
                   <DinnerDiningIcon/>  Besin-Yemek Ekle/Düzenle
                    </Button> 
                    <Button
                        href="/workshop/foodmenu"
                        LinkComponent={Link}
                        sx={{m:1}}
                        variant={
                            pathname === "/workshop/foodmenu" ? "outlined" : "contained"}>
                    <ArticleIcon/>    Menü-Öğün-Yemek Listesi Ekle/Düzenle
                    </Button> 
                 
                </Box>
            </nav>
        </Box>
    )
}