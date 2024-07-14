import { Box, Typography } from '@mui/material'
import ResetForm from '@/components/auth/ResetForm'
const ResetPage = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h5" mb={2}>Şifre Sıfırlama</Typography>
            <ResetForm/>
        </Box>
    )
} 

export default ResetPage