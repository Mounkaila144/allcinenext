import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {blueGrey, pink} from "@mui/material/colors";
import {createTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import url from "./global";
import Image from "next/image";
import CardActions from "@mui/material/CardActions";
import {useContext} from "react";
import {UserContext} from "../Context/GlobalContext";
import {useRouter} from "next/router";

export default function CategorieCard({categories}) {
    const {user,setUser}=useContext(UserContext)
    const theme = createTheme();
    const router = useRouter();

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '6.4rem',
        },
    };

    return (
        <Card sx={{
            maxWidth: 290,
            maxheight: 300,
            backgroundColor:blueGrey[900],
            borderRadius: '4%',
            boxShadow: 3
        }}>
            <CardContent
                sx={{}}
            >
                <Link href={`/categorie/${categories.id}`}>
                    <Image
                        src={url + "/storage/categorie/" +categories.image}
                        width={190} height={190}
                        alt={categories.nom}/>
                </Link>
                <Link href={`/categorie/${categories.id}`}>
                    <Box component="div" sx={{overflow: 'auto', color: 'white'}}>
                        {categories.nom }
                    </Box>
                </Link>

            </CardContent>
            {user===2?<CardActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        router.push("/categorie/edit/" + categories.id)
                    }}
                >
                    Modifier
                </Button>
            </CardActions>:null}

        </Card>
    );
}
