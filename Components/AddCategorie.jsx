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
import {DialogCategorieContext, DialogContext} from "../Context/GlobalContext";
import ErrorPage from "./ErrorPage";
import MyRequest from "./request";

const FormData = require('form-data');

export default function AddCategorie({close}) {
    const [nom, createNom] = useState("rrr")
    const [image, createimage] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {setDialogCategorie}=useContext(DialogCategorieContext)


    const router=useRouter();
    const refreshData = () => {
        router.push({ pathname: router.pathname, query: { refresh: Date.now() } });
    }

    const getImage = (image) => {
        // 👇️ take parameter passed from Child component
        createimage(image);
    };


    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('image', image);
        try {
            setLoading(true)
            MyRequest('categories', 'POST', formData, { 'Content-Type': 'multipart/form-data' })
                .then(async (response) => {
                    if (response.status === 200) {
                        await refreshData()
                        setDialogCategorie(false)
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
    }else if(error){
        return ( <ErrorPage/>)
    }
    else {
        return (
            <Box>
                <Box sx={{margin: 1, boxShadow: 3, borderRadius: 3}}>

                    <UploadImage image={getImage}/>
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <FormHelperText id="nom">
                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                nom
                            </Typography>
                        </FormHelperText>

                        <OutlinedInput
                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                            id="nom"
                            onChange={(event) => {
                                createNom(event.target.value)
                            }}
                            aria-describedby="nom"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>

                </Box>
                <Box textAlign='center'>
                    <Button variant={"contained"} onClick={onSubmit}>Enregistrer</Button>
                </Box>
            </Box>

        );
    }
}
