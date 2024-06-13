'use client';
import { Roboto } from 'next/font/google';
import { Nunito } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

/* const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
}); */
const nunito = Nunito({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});
const theme = createTheme({
    components:{
        MuiFormHelperText:{
            styleOverrides:{
                root:{
                    fontSize:16,
                }
            }
        }
    },
    palette: {
        mode: 'light',
        primary: {
            main: "#353739",
        },
    },  typography: {
        fontFamily:  nunito.style.fontFamily, 
    }, 
});

export default theme;
