import { Box } from "@mui/material"
import { UnitsEqsNavbar } from "../_components/UnitsEqsNavbar"
const UnitsEqsLayout = ({ children }) => {
    return (
        <Box>
            <UnitsEqsNavbar />
            {children}
        </Box>)
}

export default UnitsEqsLayout