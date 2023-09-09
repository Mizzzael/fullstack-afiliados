'use client'
import {createTheme} from '@mui/material'
import * as Colors from '@mui/material/colors';
import {Roboto} from "next/font/google";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const Theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily
    },
    palette: {
        ...Colors
    }
})


export default Theme;
