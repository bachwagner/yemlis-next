import { Box, Chip, Divider, Typography } from "@mui/material"

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
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Name:</Typography>
                <Chip label={user?.name} variant="outlined" />
            </Box>
            <Divider flexItem />
            <Box display="inline-flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Email:</Typography>
                <Chip label={user?.email} variant="outlined" />
            </Box>
            <Divider flexItem />
            <Box display="inline-flex" width="100%" justifyContent="space-between">
                <Typography p={0.5} variant="body2" fontSize={18} fontWeight="bold">Role:</Typography>
                <Chip label={user?.role} variant="outlined" />
            </Box>
            <Divider flexItem />

        </Box>
    )
}