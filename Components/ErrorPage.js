import { Box, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import {useRouter} from "next/router";

const primary = purple[500]; // #f44336

export default function ErrorPage() {
    const router = useRouter()
    const refreshData=()=>{
        router.replace(router.asPath)
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: primary,
            }}
        >
            <Typography variant="h1" style={{ color: 'white' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: 'white' }}>
                Une ereur c'est produit.
            </Typography>
            <Button variant="contained" onClick={()=> {
                router.push("/articles/articles")
                refreshData()
            }}>Retour au menu</Button>
        </Box>
    );
}