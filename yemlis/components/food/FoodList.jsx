"use client"
import { useEffect, useState } from "react"
import Food from "./Food"
import { Alert, Box, Button, Grid } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import { useInView } from "react-intersection-observer"
import { Movie } from "@mui/icons-material"
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
const NUMBER_OF_FOODS_TO_FETCH = 10

export default function FoodList({ initialFoods, search }) {
    const [foods, setFoods] = useState(initialFoods)
    const [offset, setOffset] = useState(NUMBER_OF_FOODS_TO_FETCH)
    const [errors, setErrors] = useState(null)
    const [ref, inView] = useInView();
    const fetchLink = !search ? `/api/foods?offset=${offset}&limit=${NUMBER_OF_FOODS_TO_FETCH}`
        : `/api/foods?offset=${offset}&limit=${NUMBER_OF_FOODS_TO_FETCH}&search=${search}`
    /*  const loadMoreFoods = async () => {
         const apiFoods = await getFoods(search, offset, NUMBER_OF_FOODS_TO_FETCH)
         console.log("api foods")
         console.log(apiFoods)
         console.log(foods)
         setFoods([...foods, ...apiFoods])
         setOffset(offset + NUMBER_OF_FOODS_TO_FETCH) 
       
         console.log("initialFoods")
         console.log(initialFoods)
     } */
    console.log("initialFoods")
    console.log(initialFoods)
    useEffect(() => {
        if (inView) {
            console.log("loadd")
            fetch(fetchLink)
                .then((res) => res.json())
                .then((data) => {
                    console.log("client:food api result")
                    console.log(data)
                    if (data.error || data.notFound) {
                        if (data.notFound) {
                            setErrors({ ...errors, notFound: true })
                        }
                        if (data.error) {
                            setErrors({ ...errors, error: true })
                        }
                    } else {
                        setErrors(null)
                        setFoods([...foods, ...data])
                        setOffset(offset + NUMBER_OF_FOODS_TO_FETCH)
                    }

                }).catch((error) => {
                    console.log("food api catch error")
                    console.log(error)
                })
        }
    }, [inView])
    if (foods) {
        return (
            <>
                {foods?.map((food) => (
                    <Grid item xs={12} md={4} lg={3} key={"grid" + food._id}>
                        <Food key={food._id} food={food} />
                    </Grid>
                ))}
                <Box ref={ref} sx={{ width: '100%', mb: 1, }}>
                    <LinearProgress sx={{ display: errors ? "none" : "inherit" }} />
                    <Alert sx={{ display: errors?.error ? "flex" : "none", justifyContent: "center" }} severity="error">Bir Hata Oluştu</Alert>
                    <Alert sx={{ display: errors?.notFound ? "flex" : "none", justifyContent: "center" }} icon={<RestaurantMenuIcon />} color="error">Aranan Besin Bulunamadı</Alert>

                </Box>
            </>
        )
    } else {
        return <>Sonuç yok</>
    }


}