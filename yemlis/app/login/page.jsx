import LoginForm from "@/components/login/Login-Form";
import { Box, Grid, Typography } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';

export default function LoginPage() {
    return (
        <main >

            <Grid container direction="column">
                <Grid item sx={12} textAlign="center" >
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <FoodBankIcon fontSize="large" sx={{ display: {md: 'flex' }, mr: 1 }} />
                        <Typography variant="h4" > Yemlis</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={1}>
                        <Typography variant="h4" fontSize={30}> Giriş Yap</Typography>
                     </Box>
                </Grid>

                <Grid item sx={12}>
                    <LoginForm />

                </Grid>

            </Grid>
        </main >
    );
}