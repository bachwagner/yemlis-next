"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectFoodPortions({portions}) {
    const [portion, setPortion] = useState('100 gram');

    const handleChange = (event) => {
        setPortion(event.target.value);
    };
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="select-food-portion">Besin Porsiyonu</InputLabel>
                <Select
                    labelId="select-food-portion"
                    id="food-select"
                    value={portion}
                    label="Besin Porsiyon"
                    onChange={handleChange}
                    size='small'
                    sx={{fontSize:22}}
                    
                >
                    <MenuItem value="100 gram">100 gram</MenuItem>
                    <MenuItem value="1 Küçük Boy">1 Küçük Boy</MenuItem>
                    <MenuItem value="1 Orta Boy">1 Orta Boy</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectFoodPortions