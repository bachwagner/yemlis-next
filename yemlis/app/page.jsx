import Feed from "@/components/Feed";
import Switch from "@mui/material/Switch";
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import NextLink from 'next/link'
import { Container, Typography, Box, Grid } from '@mui/material';

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container sx={{
                display: "grid",
                justifyContent: "center",
                flexDirection: "row",
                height: "100vh",
                backgroundColor: "bisque",
            }} >
                <section>
                    <Grid container>
                        <Grid item xs={12} >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center" maxWidth={800} minWidth={200} >
                                <Typography
                                    variant='h1'
                                    fontSize={60}
                                    fontWeight={400} textAlign="center"
                                    lineHeight={1} pt={2} pr={2} pl={2} m={0} >
                                    Yemek ve Menü Paylaşım Platformu
                                </Typography>
                                <Typography variant='h5' m={0} p={2} textAlign="center">
                                    Yemlis ücretsiz besin, yemek, tarif, menü ve besin bilgileri  oluşturma, paylaşma ve keşfetme platformu
                                </Typography>
                                <Link
                                    href="/about"
                                    component={NextLink}
                                    variant="body2">
                                    Your link
                                </Link>
                                {/*  <Button 
                                href="/about"
                                LinkComponent={NextLink} 
                                variant="body2">
                                Your link
                            </Button> */}
                                <Switch {...label} defaultChecked />

                            </Box>
                        </Grid>
                        <Feed />
                    </Grid>
                </section>
            </Container>
        </Box>
    );
}