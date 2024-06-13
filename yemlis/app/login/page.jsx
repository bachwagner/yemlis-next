import LoginForm from "@/components/login/Login-Form";
import { Grid } from "@mui/material";

export default function LoginPage() {
    return (
        <main >
            Login Page
            <Grid container>
                <Grid item sx={12}>
                    <LoginForm />

                </Grid>

            </Grid>
        </main>
    );
}