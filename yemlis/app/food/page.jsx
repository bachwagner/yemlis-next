"use server"
import { Container, Typography, Box, Paper, Grid, Button, LinearProgress } from '@mui/material';
import CustomLink from '@/components/inputs/CustomLink'
import Image from 'next/image';
import MacroChart from '@/components/food/singular/MacroChart';


//export const revalidate = 3600
export default async function Food({ searchParams }) {
    /*  const Item = styled(Paper)(({ theme }) => ({
         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
         ...theme.typography.body2,
         padding: theme.spacing(1),
         textAlign: 'center',
         color: theme.palette.text.secondary,
       })); */

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Paper sx={{ textAlign: 'center' }} >
                            <Typography align='left' variant="h1" fontSize={36} p={1}>İnek Sütü (Yarım Yağlı- %2)</Typography>
                        </Paper>
                        <Box display="flex" p={1}>
                            Options
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Paper sx={{ textAlign: 'center' }} >
                            <Typography align='left' variant="h1" fontSize={18} p={1}>Üretici Firma: Neilson</Typography>
                        </Paper>
                        <Box display="flex" p={1}>
                            <Typography align='left' variant="h1" fontSize={18} p={1}>Ekleyen: Uzm. Dyt. Mustafa Turgut</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} spacing={1} container direction="row">
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', height: 280 }} >
                            <Image
                                src={`/static/images/foods/milk.jpeg`}
                                height={250}
                                width={350}
                                alt="paella"
                            />
                            <Button>Like </Button>
                            <Button>Save </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', minHeight: 280 }} >
                            <Typography align='left' variant="body1" fontSize={18} p={2}>
                                Bütün canlılar gibi insanlar da sütle yaşamın ilk
                                günlerinde tanışır. Süt, içeriğinde insan vücudunun
                                temel ihtiyaçlarını karşılamaya yetecek ölçüde besin maddesi bulunduran
                                ve sayısız faydası olan bir gıda çeşididir. Temel besin maddelerinden biri
                                olan sütten pek çok farklı yiyecek elde edilir. Süt ürünleri olarak bilinen
                                bu besinlere, ham maddesi süt olan yoğurt, ayran, farklı peynir çeşitleri,
                                kaymak ve tereyağı gibi besinler örnek olarak verilebilir.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 1 }}>
                        Glisemik İndeks: 35
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: 15 }} color="success" variant="determinate" value={35} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 1 }}>
                        Glisemik Yük: 15
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: 15 }} color="warning" variant="determinate" value={35} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 1 }}>
                        <Typography fontSize={24}>
                            Kalori: 130 kkal
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 1 }}>
                        <MacroChart/>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}


