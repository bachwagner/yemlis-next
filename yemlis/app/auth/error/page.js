import { ErrorCard } from "@/components/auth/ErrorCard"
import { Box } from "@mui/material"
const AuthErrorPage = () => {

    return(
        <Box>
                <ErrorCard text="Bir Şeyler Ters Gitti" redirectPage="/auth/login"/>
        </Box>
    )
}

export default AuthErrorPage