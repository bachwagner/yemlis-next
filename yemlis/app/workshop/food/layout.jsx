import { Box } from "@mui/material"
import { FoodsNavbar } from "../_components/FoodsNavbar"
const FoodLayout = ({ children }) => {
    return (
        <Box>
            <FoodsNavbar/>
            {children}
        </Box>)
}

export default FoodLayout