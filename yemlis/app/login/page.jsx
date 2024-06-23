import LoginFormAPI from "@/components/login/Login-Form-API";
import { Box, Grid, Typography } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
export default async function LoginPage() {
    const session = await getServerSession(authOptions)
    console.log("session")
    console.log(session)
    if (session) redirect('/dashboard')
    return (
        <main >
            <Grid container direction="column">
                <Grid item sx={12} textAlign="center" >
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <FoodBankIcon fontSize="large" sx={{ display: { md: 'flex' }, mr: 1 }} />
                        <Typography variant="h4" > Yemlis</Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mb={1}>
                        <Typography variant="h4" fontSize={30}> Giriş Yap</Typography>
                    </Box>
                </Grid>

                <Grid item sx={12}>
                    <LoginFormAPI />
                </Grid>
            </Grid>
        </main >
    );
}