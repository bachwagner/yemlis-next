"use client"
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
export default function Search() {
    const router = useRouter()
    const [text, setText] = useState('')
    const [query] = useDebounce(text, 500)
 
    useEffect(() => {
        if (!query) {
            router.push(`/`)
        }else{
            router.push(`/?search=${query}`)
        }
    }, [query, router])

    return (
        <Box display="flex" justifyContent="center" width="500px" sx={{ '& > :not(style)': { m: 1 } }}>
            <FormControl variant="standard" fullWidth >
                <InputLabel htmlFor="search-food">
                    Besin Ara
                </InputLabel>
                <Input
                    id="search-food"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    onChange={(e) => setText(e.target.value)}
                />
            </FormControl>
        </Box>
    );
}