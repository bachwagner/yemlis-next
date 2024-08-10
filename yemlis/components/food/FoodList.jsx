"use client"
import { useEffect, useState } from "react"
import Food from "./Food"
import { getFoods } from "@/utils/food"
import { Box, Button, Grid } from "@mui/material"
import LinearProgress from '@mui/material/LinearProgress';
import { useInView } from "react-intersection-observer"
import { Movie } from "@mui/icons-material"

const NUMBER_OF_FOODS_TO_FETCH = 10

export default function ({ initialFoods, search }) {
    const [foods, setFoods] = useState(initialFoods)
    const [offset, setOffset] = useState(NUMBER_OF_FOODS_TO_FETCH)
    const [ref, inView] = useInView();
    const fetchLink = !search ? `/api/foods?offset=${offset}&limit=${NUMBER_OF_FOODS_TO_FETCH}`
                      : `/api/foods?offset=${offset}&limit=${NUMBER_OF_FOODS_TO_FETCH}&search=${search}`
    const loadMoreFoods = async () => {
        const apiFoods = await getFoods(search, offset, NUMBER_OF_FOODS_TO_FETCH)
        console.log("api foods")
        console.log(apiFoods)
        console.log(foods)
        setFoods([...foods, ...apiFoods])
        setOffset(offset + NUMBER_OF_FOODS_TO_FETCH)
      
        console.log("initialFoods")
        console.log(initialFoods)
    }
    console.log("initialFoods")
    console.log(initialFoods)
    useEffect(()=>{
        if(inView){
            console.log("loadd")
            fetch(fetchLink)
            .then((res) => res.json())
            .then((data) => {
                console.log("client:food api result")
                console.log(data)
                setFoods([...foods, ...data])
                setOffset(offset + NUMBER_OF_FOODS_TO_FETCH)

            }).catch((error) => {
                console.log("food api catch error")
                console.log(error)
            })
        }
    },[inView])
    if (foods) {
        return (
 
            <>
                {foods?.map((food) => (
                    <Grid item xs={12} md={4} lg={3} key={"grid" + food._id}>
                        <Food key={food._id} food={food} />
                    </Grid>
                ))}
                <Box ref={ref}  sx={{ width: '100%',mb:1, }}>
                    <LinearProgress />
                </Box>
            </>
        )
    } else {
        return <>Sonuç yok</>
    }


}