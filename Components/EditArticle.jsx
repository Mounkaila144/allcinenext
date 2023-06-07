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
import {useContext, useEffect, useRef, useState} from "react";
import ImageUploading from "react-images-uploading";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import {useRouter} from "next/router";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import url from "./global";
import Circular from "./Circular";
import {UserContext} from "../Context/GlobalContext";
import MyRequest from "./request";

const FormData = require('form-data');

export default function Edit({close,id}) {
    const [nom, createNom] = useState(null)
    const [image, createimage] = useState([])
    const [loading, setLoading] = useState(false)
    const router=useRouter();
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const initial = useRef(false);
    const {user,setUser}=useContext(UserContext)


    const refreshData=()=>{
        router.replace(router.asPath)
    }
    const getImage = (image) => {
        // 👇️ take parameter passed from Child component
        createimage(image);
    };
if (show){
    setTimeout(() => {
        // After 3 seconds set the show value to false
        router.push('/articles/categorie/');
    }, 1000)
}
    const onSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const formData = new FormData();
        nom===null?null:formData.append('nom', nom);
        image===[]?null:formData.append('image', image);
        try {
            await MyRequest('categories/'+id+"?_method=PUT", 'POST', formData, { 'Content-Type': 'multipart/form-data' })
                .then(async (response) => {
                    if (response.status === 200) {
                        await setShow(true)

                    }
                }).finally(()=>setLoading(false));
        } catch (e) {
            alert(e)
        }

    }
    const onDelect = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await MyRequest('categories/'+id, 'DELETE', {}, { 'Content-Type': 'multipart/form-data' })
                .then(async (response) => {
                    if (response.status === 200) {
                        await setShow(true)

                    }
                }).finally(()=>setLoading(false));
        } catch (e) {
            alert(e)
        }

    }
    if (show) {
        return (
        <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Votre modification <strong>a bien été prise en compte!</strong>
        </Alert>
        );
    }else {
        if (loading) {
            return (
                <Circular/>
            )
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
                        <Button variant={"contained"} onClick={onSubmit}>Modifier</Button>
                    </Box>
                    <Box textAlign='left'>
                        <Button variant={"contained"} sx={{backgroundColor:"red",marginTop:3}} onClick={onDelect}>Suprimer la categorie et son contenue</Button>
                    </Box>

                </Box>

            );
        }
    }
}
