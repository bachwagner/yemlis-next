"use server"
import { Container, Typography, Box, Paper, Grid, Button, LinearProgress, Stack, Chip } from '@mui/material';
import Image from 'next/image';
import MacroChart from '@/components/food/singular/MacroChart';
import { notFound } from 'next/navigation';
import { getFood } from '@/utils/food';
import FeedBacks from '@/components/food/singular/FeedBacks';
import SelectFoodPortions from '@/components/food/singular/SelectFoodPortions';
import NutrientTable from '@/components/food/singular/NutrientTable';
import FoodBands from '@/components/food/singular/FoodBands';
import FoodOptions from '@/components/food/FoodOptions';
import CustomLink from '@/components/inputs/CustomLink';
import VerifiedIcon from '@mui/icons-material/Verified';
import GlycemicIndex from '@/components/food/singular/GlycemicIndex';
import GlycemicLoad from '@/components/food/singular/GlycemicLoad';
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

/* const eNutrientTableInfos = {
    tableName:"Etken Maddeler",
    headCells: [
        {
            id: 'enutrient',
            numeric: false,
            disablePadding: true,
            label: 'Etken Madde'
        },
        {
            id: 'value',
            numeric: true,
            disablePadding: false,
            label: 'Miktar',
        },
        {
            id: 'unit',
            numeric: true,
            disablePadding: false,
            label: 'Birim',
        }
    ],
    elements: [{
        id: 1,
        nutrient: "Lactobacillus Acidophilus",
        value: "2*10^9",
        unit: 'kob'
    }, {
        id: 2,
        nutrient: "Bifidobacterium longum",
        value: "2*10^9",
        unit: 'kob'
    },{
        id: 3,
        nutrient: "Bifidobacterium bifidium",
        value: "1*10^9",
        unit: 'kob'
    }]
} */

const tags = [
    { name: "vegan", label: "Vegan Besin", image: "vegan", text: "Vegan Besin Açıklaması" },
    { name: "milk", label: "Süt", image: "milk", text: "Bu ürün süt ürünü olup laktoz ve kazein içerir." },
    { name: "toxic", label: "Toxic", image: "toxic", text: "Toksik Ürün" },
    { name: "caution", label: "Dikkatli Tüketim Gerekli", image: "caution", text: "Dikkatli Tüketim Gereken Ürün" },
    { name: "highGI", label: "Yüksek Glisemik İndeks", image: "highGI", text: "Kan şekerini hızlı yükseltir" },
]
export default async function FoodDetails({ params }) {
    const foodId = params.foodId
    if (!foodId) notFound()
    const food = await getFood(foodId)
    //console.log("GCF")
    //console.log(food)
    if (food.error) {
        notFound()
    }
    const calorie = food.quantitativeValues[1]?.value
    const GI = food.quantitativeValues?.find(q => q.name === "Glycemix Index")?.value
    const GL = food.quantitativeValues?.find(q => q.name === "Glycemix Load")?.value
    console.log("GII")
    console.log(GI)
    console.log(GL)
    const nutrientTableInfos = {
        tableName: "Besin Öğeleri",
        headCells: [
            {
                id: 'nutrient',
                numeric: false,
                disablePadding: true,
                label: 'Besin Öğeleri'
            },
            {
                id: 'value',
                numeric: true,
                disablePadding: false,
                label: 'Miktar',
            },
            {
                id: 'unit',
                numeric: true,
                disablePadding: false,
                label: 'Birim',
            }
        ],
        elements: [...food.nutritionValues]
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
                            <FoodOptions foodId={food._id} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Paper sx={{ display: "inline-flex", alignItems: "center", textAlign: 'center', p: 1 }} >
                                <Typography align='left' alignItems="center" variant="h3" fontSize={18} p={1}>
                                    Üretici Firma:{
                                        food.manufacturer?.organisation
                                            ? <CustomLink label={food.manufacturer?.name} target={food.manufacturer?.organisation?.profileLink} variant="h3" />
                                            : food.manufacturer?.name}  </Typography>
                                {food.manufacturer?.organisation.isVerified && <VerifiedIcon />}
                            </Paper>
                        </Box>
                        <Box display="flex" p={1}>
                            <Paper sx={{ display: "inline-flex", alignItems: "center", textAlign: 'center', p: 1 }} >
                                <Typography align='left' variant="h3" fontSize={18} p={1}>Ekleyen:
                                    <CustomLink
                                        label={food.creationInfos?.creator?.name}
                                        target={food.creationInfos?.creator?.profileLink}
                                        variant="h3" /> </Typography>
                                {food.creationInfos?.creator?.isVerified && <VerifiedIcon />}
                            </Paper>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} spacing={1} container direction="row">
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', height: 300 }} >
                            <Box><Image
                                src={`/static/images/foods/${food.image}`}
                                height={250}
                                width={350}
                                alt={`${food.name} resmi`}
                            /></Box>
                            <Box><FeedBacks food={food} /></Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper sx={{ textAlign: 'center', minHeight: 300 }} >
                            <Typography align='left' variant="body1" fontSize={18} p={2}>
                                {food.text?.tr ? food.text?.tr : food.text?.en}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12}>
                    <Paper sx={{ p: 1 }}>
                        <Box display="flex" alignItems="center">
                            <Typography fontSize={24} mr={1}>
                                Porsiyon:
                            </Typography>
                            <SelectFoodPortions portions={food.foodPortions} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Paper sx={{ p: 1 }}>
                        <Typography fontSize={24}>
                            Kalori: {calorie} kkal
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 1 }}>
                        <MacroChart />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 1 }}>
                        <FoodBands tags={tags} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <GlycemicIndex value={GI} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1 }}>
                        <GlycemicLoad value={GL} />
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
                                <Chip label="Fıstık" variant="outlined" />
                                <Chip label="Kakao" variant="outlined" />
                                <Chip label="Aspartam (E951)" variant="outlined" />
                                <Chip label="Şeker" variant="outlined" />
                                <Chip label="sitrik asit" variant="outlined" />
                                <Chip label="Aspartam (E951)" variant="outlined" />
                            </Stack>

                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h3" fontSize={18} p={1}>Besin Öğeleri</Typography>
                        <Paper sx={{ textAlign: 'center' }} >
                            <Typography align='left' variant="h3" fontSize={18} p={1}>
                                <CustomLink label={food.source} target="/usda" variant="h3" /></Typography>
                        </Paper>
                    </Box>
                    <Paper sx={{ p: 1 }}>
                        <NutrientTable tableInfos={nutrientTableInfos} />
                    </Paper>
                </Grid>
                {/*  <Grid item xs={12} sm={12} md={6} >
                <Typography variant="h3"fontSize={22} p={1}>Etken Maddeler</Typography>
                    <Paper sx={{ p: 1 }}>
                        <NutrientTable tableInfos={eNutrientTableInfos} />
                    </Paper>
                    <Typography variant="h3"fontSize={22} p={1}>Diğer Maddeler ve Kimyasallar</Typography>
                    <Paper sx={{ p: 1 }}>
                        <NutrientTable tableInfos={eNutrientTableInfos} />
                    </Paper>
                </Grid> */}


            </Grid>
        </Box>
    );
}


