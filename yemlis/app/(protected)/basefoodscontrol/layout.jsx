import { Box } from "@mui/material"
import { UnitsEqsNavbar } from "../_components/UnitsEqsNavbar"
import { BaseFoodsNavbar } from "../_components/BaseFoodsNavbar"
const UnitsEqsLayout = ({ children }) => {
    return (
        <Box>
            <BaseFoodsNavbar />
            {children}
        </Box>)
}

export default UnitsEqsLayout