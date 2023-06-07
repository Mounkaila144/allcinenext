import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import {useContext, useState} from "react";
import Button from "@mui/material/Button";
import {useRouter} from "next/router";
import MyRequest from "../request";
import Circular from "../Circular";
import ErrorPage from "../ErrorPage";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddPayement({id}) {
    const [prix, createPrix] = useState(5)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [dialog, setDialog] = React.useState(false);
    const handleClickOpen = () => {
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };
    const Cfa = (price) => {
        return price.toLocaleString('fr-FR', {style: 'currency', currency: 'CFA'}).replace(',00', '');
    }
    const router=useRouter();
    const refreshData = () => {
        router.push('/articles/listreservation/');
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            "payer":prix
        }

        try {
            setLoading(true)
            MyRequest('reservations/payer/'+id, 'POST', formData, { 'Content-Type': 'application/json' })
                .then(async (response) => {
                    if (response.status === 200) {
                        setDialog(false)
                        await router.push("/factures/factures")
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
                <Button
                    startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                    Ajouter
                </Button>
                <Dialog
                    open={dialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Ajouter un nouveau article"}</DialogTitle>
                    <DialogContent >
                <Box sx={{margin: 1, boxShadow: 3, borderRadius: 3}}>
                    <FormControl sx={{m: 1, width: '20ch'}} variant="outlined">
                        <FormHelperText id="vente">
                            <Typography component="h3" sx={{fontSize: 23}} variant="h5">
                                Prix a ajouter
                            </Typography>
                        </FormHelperText>

                        <OutlinedInput
                            sx={{height: '5ch', boxShadow: 3, borderRadius: 2}}
                            id="vente"
                            onChange={(event) => {
                                createPrix(parseInt(event.target.value))
                            }}
                            endAdornment={<InputAdornment position="end">CFA</InputAdornment>}
                            aria-describedby="prix"
                            inputProps={{
                                'type': "number",
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                </Box>
                <Box textAlign='center'>
                    <Button variant={"contained"} onClick={onSubmit}>Enregistrer</Button>
                </Box>
                    </DialogContent>
                </Dialog>
            </Box>

        );
    }
}
