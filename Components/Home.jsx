import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidbare from "./sidbare";
import {grey} from "@mui/material/colors";

export default function MenuHome({children}) {

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Sidbare/>
            <Box component="main" sx={{backgroundColor:grey[200],flexGrow: 1 ,margin:1,boxShadow:3 }}>
                {children}
            </Box>
        </Box>
    );
}
