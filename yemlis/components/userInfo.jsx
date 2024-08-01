import { Box, Chip, Divider, Typography } from "@mui/material"
import DoneIcon from '@mui/icons-material/Done'
import WarningIcon from '@mui/icons-material/Warning';

export const UserInfo = ({
    user,
    label,
}) => {
    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="400px">
            <Typography variant="body1" fontSize={24}>{label}</Typography>
            <Divider flexItem />
            <Box display="flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">ID:</Typography>
                <Chip label={user?._id} variant="outlined" />
            </Box>
            <Divider flexItem />
            <Box display="inline-flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">İsim:</Typography>
                <Chip label={user?.name} variant="outlined" />
            </Box>
            <Divider flexItem />
            <Box display="inline-flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Email:</Typography>
                <Chip label={user?.email} variant="outlined" />
            </Box>
            <Divider flexItem />
            <Box display="inline-flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Rol:</Typography>
                <Chip label={user?.role} variant="outlined" />
            </Box>
            <Divider flexItem />
            {user?.isMarkedToDelete &&
                <Box display="inline-flex" width="100%" justifyContent="space-between" alignItems="center" >
                    <Box display="inline-flex" alignItems="center" justifyContent="space-between">
                        <WarningIcon color="error" />
                        <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Hesap Silme Talebi! </Typography>

                    </Box>
                    <Chip label={<DoneIcon />} variant="outlined" />
                </Box>}
            <Divider flexItem />

        </Box>
    )
}