import Feed from "@/components/Feed";
import Switch from "@mui/material/Switch";
import { Container, Typography, Box, Grid } from '@mui/material';
import CustomLink from '@/components/inputs/CustomLink'
import { Suspense } from "react";
import { getFoods } from "@/utils/food";
import FoodList from "@/components/food/FoodList";
import Search from "@/components/food/Search";
import { test } from "./lib/actions/test";
const label = { inputProps: { "aria-label": "Switch demo" } };

const INITIAL_NUMBER_OF_FOODS = 10
export const revalidate = 3600
export default async function Home({ searchParams }) {
    const search = typeof searchParams.search == 'string' ? searchParams.search : null
    // const limit = typeof searchParams.limit == 'string' ? Number(searchParams.limit) : 10

    // const initialFoods = await getFoods(null, 0, INITIAL_NUMBER_OF_FOODS)
    const initialFoods = await getFoods(search, 0, INITIAL_NUMBER_OF_FOODS)
    /*  console.log("foodss")
     console.log(initialFoods) */
    return (
        <Box sx={{ flexGrow: 1 }} >

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box maxWidth={800} minWidth={200}>
                            <Typography
                                variant='h1'
                                fontSize={60}
                                fontWeight={400} textAlign="center"
                                lineHeight={1} pt={2} pr={2} pl={2} m={0}>
                                Yemek ve Menü Paylaşım Platformu
                            </Typography>
                            <Typography variant='h5' m={0} p={2} textAlign="center">
                                Yemlis ücretsiz besin, yemek, tarif, menü ve besin bilgileri  oluşturma, paylaşma ve keşfetme platformu
                            </Typography>
                        </Box>
                        <Search />
                    </Box>

                </Grid>

                <Suspense fallback={<>Besin Yükleniyor</>}>
                    <div style={{display:"contents"}}  key={Math.random(6)} >
                        <FoodList search={search} initialFoods={JSON.parse(JSON.stringify(initialFoods))} />
                    </div>
                </Suspense>

                {/* <Grid item xs={4} >
                <Feed />
            </Grid>
            <Grid item xs={4} >
                <Feed />
            </Grid>
 */}
            </Grid >

        </Box >
    );
}


{/* <CustomLink target="/" label="Anasayfa" /> */ }

{/*  <Button 
                                href="/about"
                                LinkComponent={NextLink} 
                                variant="body2">
                                Your link
                            </Button> */}
/* <Switch {...label} defaultChecked />  */