import { Box } from "@mui/material"
import { UnitsNavbar } from "../_components/UnitsNavbar"
const UnitsLayout = ({ children }) => {
    return (
        <Box>
            <UnitsNavbar />
            {children}
        </Box>)
}

export default UnitsLayout