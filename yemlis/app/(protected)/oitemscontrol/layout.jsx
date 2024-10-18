import { Box } from "@mui/material"
import { OItemsNavbar } from "../_components/OItemsNavbar"
const OItemsLayout = ({ children }) => {
    return (
        <Box>
            <OItemsNavbar />
            {children}
        </Box>)
}

export default OItemsLayout