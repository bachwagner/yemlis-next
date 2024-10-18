import { Box } from "@mui/material"
import { Navbar } from './_components/Navbar'
const WorkshopLayout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            {children}
        </Box>)
}

export default WorkshopLayout