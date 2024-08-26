import { Box } from "@mui/material"
import { FoodGroupNavbar } from '@/app/(protected)/_components/FoodGroupNavbar'
const FoodGroupsLayout = ({ children }) => {
    return (
        <Box>
            <FoodGroupNavbar />
            {children}
        </Box>)
}

export default FoodGroupsLayout