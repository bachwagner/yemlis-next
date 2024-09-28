import { Box } from "@mui/material"
import { FoodGroupNavbar } from '@/app/(protected)/_components/FoodGroupNavbar'
import { ItemsNavbar } from "../_components/ItemsNavbar"
const ItemsLayout = ({ children }) => {
    return (
        <Box>
            <ItemsNavbar />
            {children}
        </Box>)
}

export default ItemsLayout