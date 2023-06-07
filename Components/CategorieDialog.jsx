import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Add from "./AddArticle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useContext} from "react";
import {DialogCategorieContext, DialogContext} from "../Context/GlobalContext";
import AddCategorie from "./AddCategorie";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategorieDialog() {
    const {dialogCategorie,setDialogCategorie}=useContext(DialogCategorieContext)
    const handleClickOpen = () => {
        setDialogCategorie(true);
    };

    const handleClose = () => {
        setDialogCategorie(false);
    };

    return (
        <div>
            <Button
                sx={{
                    position: 'fixed',
                    top: 2,
                    right: 2,
                    zIndex: 1000,
                    borderRadius:5
                }}
                startIcon={<AddCircleIcon/>} variant="contained" onClick={handleClickOpen}>
                Ajouter
            </Button>
            <Dialog

                open={dialogCategorie}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Ajouter un nouveau Categorie"}</DialogTitle>
                <DialogContent >
                    <AddCategorie/>
                </DialogContent>
            </Dialog>
        </div>
    );
}