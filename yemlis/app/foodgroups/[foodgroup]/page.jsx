"use server"
import { Container, Typography, Box, Paper, Grid, Button, LinearProgress, Stack, Chip, Alert } from '@mui/material';

import { notFound } from 'next/navigation';

import { getFoodGroup } from '@/utils/foodgroups';


export default async function FoodGroupDetails({ params }) {
    const foodGroupLink = params.foodgroup
    console.log("foodGroupLink")
    console.log(foodGroupLink)
    const foodGroupName = foodGroupLink.replaceAll("-"," ")
    const foodGroup = await getFoodGroup(foodGroupName)
    if (!foodGroup) notFound()
 
    if (foodGroup.error) {
        return (<Alert severity='error'>{foodGroup.message}</Alert>)
    }

    return (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
                        <Paper sx={{ textAlign: 'center' }} >
                            <Typography align='left' variant="h1" fontSize={36} p={1}>{foodGroup?.name}</Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}


