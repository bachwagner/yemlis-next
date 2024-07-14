import { Box } from "@mui/material"
import { Navbar } from './_components/Navbar'
const ProtectedLayout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            {children}
        </Box>)
}

export default ProtectedLayout