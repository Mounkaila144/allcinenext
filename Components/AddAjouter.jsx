import * as React from 'react';
import Box from '@mui/material/Box';
import {IconClose} from "./Icon";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import {UploadImage} from "./uploadImage/uploadImage";
import axios from "axios";
import {useContext, useState} from "react";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import {useRouter} from "next/router";
import url from "./global";
import Circular from "./Circular";
import {DialogContext} from "../Context/GlobalContext";
import ErrorPage from "./ErrorPage";
import {Grid} from "@mui/material";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import MyRequest from "./request";

export default function AddAjouter({close}) {
    const [motif, createMotif] = useState(null)
    const [prix, createPrix] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {setDialog} = useContext(DialogContext)


    const router = useRouter();
    const refreshData = () => {
        router.push({ pathname: router.pathname, query: { refresh: Date.now() } });
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            "motif": motif,
            "prix": prix,
            "type": 1,
            "user_id": 1
        }
        try {
            setLoading(true)
            MyRequest('entresorties', 'POST', formData, { 'Content-Type': 'application/json' })
                .then(async (response) => {
                    if (response.status === 200) {
                        await refreshData()
                        setDialog(false)
                    }
                }).finally(() => setLoading(false));
        } catch (e) {
            setError(true)
        }

    }
    if (loading) {
        return (
            <Circular/>
        )
    } else if (error) {
        return (<ErrorPage/>)
    } else {
        return (
            <Grid container rowSpacing={1} sx={{margin: 1, boxShadow: 3, borderRadius: 3}} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={6}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <FormHelperText id="nom">
                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                Motif
                            </Typography>
                        </FormHelperText>

                        <OutlinedInput
                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                            id="nom"
                            type={"text"}
                            onChange={(event) => {
                                createMotif(event.target.value)
                            }}
                            aria-describedby="nom"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <FormHelperText id="achat">
                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                Somme à ajouter
                            </Typography>
                        </FormHelperText>

                        <OutlinedInput
                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                            id="achat"
                            onChange={(event) => {
                                createPrix(parseInt(event.target.value))
                            }}
                            endAdornment={<InputAdornment position="end">CFA</InputAdornment>}
                            aria-describedby="nom"
                            inputProps={{
                                'type': "number",
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} display="flex"
                      justifyContent="center"
                      alignItems="center">

                    <Button onClick={onSubmit} variant={"contained"} sx={{fontSize: 20}}
                            startIcon={<BeenhereIcon/>}>Ajouter</Button>
                </Grid>

            </Grid>
    )
        ;
    }
}
