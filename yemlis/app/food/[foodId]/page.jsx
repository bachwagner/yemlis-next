"use server"
import { Container, Typography, Box, Paper, Grid, Button, LinearProgress, Stack, Chip } from '@mui/material';
import CustomLink from '@/components/inputs/CustomLink'
import Image from 'next/image';
import MacroChart from '@/components/food/singular/MacroChart';
import { notFound } from 'next/navigation';
import { getFood } from '@/utils/food';
import FeedBacks from '@/components/food/singular/FeedBacks';
import SelectFoodPortions from '@/components/food/singular/SelectFoodPortions';
import NutrientTable from '@/components/food/singular/NutrientTable';
import FoodBands from '@/components/food/singular/FoodBands';


/* export async function generateStaticParams() { //TODO
    // const posts = await getFoods(null,0,10)
    // `/api/foods?offset=${offset}&limit=${NUMBER_OF_FOODS_TO_FETCH}&search=${search}`
    // const foods = await fetch('http://localhost:3000/api/foods?offset=0&limit=10').then((res) => res.json())
    console.log("generateStaticParams")
    const foods = [{ _id: "123" }, { _id: "523" }, { _id: "435" }]
    return foods.map((food) => ({
        foodId: food._id,
    }))
} */
//export const revalidate = 3600
export default async function FoodDetails({ params }) {
    const foodId = params.foodId
    if (!foodId) notFound()
    const food = await getFood(foodId)
    console.log("food dynamic")
    console.log(food)
    if (food.error) {
        notFound()
    }

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
                            <Typography align='left' variant="h1" fontSize={36} p={1}>{food?.name}</Typography>
                        </Paper>
                        <Box display="flex" p={1}>
                            Options
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Paper sx={{ textAlign: 'center' }} >
                            <Typography align='left' variant="h3" fontSize={18} p={1}>Üretici Firma: Neilson</Typography>
                        </Paper>
                        <Box display="flex" p={1}>
                            <Typography align='left' variant="h3" fontSize={18} p={1}>Ekleyen: Uzm. Dyt. Mustafa Turgut</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} spacing={1} container direction="row">
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', height: 300 }} >
                            <Box><Image
                                src={`/static/images/foods/milk.jpeg`}
                                height={250}
                                width={350}
                                alt="paella"
                            /></Box>
                            <Box><FeedBacks food={food} /></Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', minHeight: 300 }} >
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

                <Grid item xs={12} md={12}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center">
                            <Typography fontSize={24} mr={1}>
                                Porsiyon:
                            </Typography>
                            <SelectFoodPortions />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{ p: 1 }}>
                        <Typography fontSize={24}>
                            Kalori: {food.quantitativeValues[1].value} kkal
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1 }}>
                        Glisemik İndeks: 35
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: 15 }} color="success" variant="determinate" value={35} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1 }}>
                        Glisemik Yük: 15
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress sx={{ height: 15 }} color="warning" variant="determinate" value={35} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 1 }}>
                        <MacroChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 1 }}>
                        <FoodBands />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} >
                    <Paper sx={{ p: 1 }}>
                        <Typography variant="h2" fontSize={22} fontWeight={400} mb={1}>
                            Besin İçerikleri
                        </Typography>
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <Chip label="İnek Sütü" variant="outlined" />
                            </Stack>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} >
                    <Paper sx={{ p: 1 }}>
                        <NutrientTable />
                    </Paper>
                </Grid>


            </Grid>
        </Box>
    );
}


