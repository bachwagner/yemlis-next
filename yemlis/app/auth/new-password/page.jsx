import { Box, Typography } from '@mui/material'
import NewPasswordForm from '@/components/auth/NewPasswordForm'
const NewPasswordPage = () => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h5" mb={2}>Yeni Şifre</Typography>
            <NewPasswordForm />
        </Box>
    )
}

export default NewPasswordPage